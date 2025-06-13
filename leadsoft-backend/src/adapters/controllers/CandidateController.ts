import { Request, Response } from 'express';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';
import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { DeleteCandidate } from '../../application/use-cases/DeleteCandidate';
import { getRavenDbConnection } from '../../config/ravenDbConfig';

export class CandidateController {
  private registerCandidate: RegisterCandidate;
  private deleteCandidate: DeleteCandidate;
  private candidateRepository: CandidateRepository;

  constructor(registerCandidate: RegisterCandidate, deleteCandidate:DeleteCandidate, candidateRepository: CandidateRepository) {
    this.registerCandidate = registerCandidate;
    this.deleteCandidate = deleteCandidate;
    this.candidateRepository = candidateRepository;
  }

  // Método para registrar um candidato
  async register(req: Request, res: Response) {
    console.log("Recebido no backend:", req.body);
  
    try {
      const { name, cpf, email, dateOfBirth, caption, recaptchaToken } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "Imagem não enviada" });
      }
  
      const imageBuffer = req.file.buffer;
      const mimeType = req.file.mimetype;
      const fileName = req.file.originalname;
      console.log("req.file =", req.file);

      // verifica se já tem o cpf cadastrado
      const cleanedCpf = cpf.replace(/\D/g, '');
      const existingCPF = await this.candidateRepository.findByCpf(cleanedCpf);
      if(existingCPF){
        return res.status(400).json({ field: "cpf", message: "CPF já cadastrado" });
      }

      // verifica se já tem o email cadastrado
      const existingEmail = await this.candidateRepository.findByEmail(email);
      if(existingEmail){
        return res.status(400).json({ field: "email", message: "Email já cadastrado" });
      }

      await this.registerCandidate.execute(
        name,
        cpf,
        email,
        dateOfBirth,
        caption,
        imageBuffer,
        recaptchaToken,
        mimeType,
        fileName
      );

      console.log("📦 Arquivo recebido:", req.file);
      console.log("📦 Buffer:", req.file?.buffer?.slice(0, 20));
  
      res.status(201).json({ message: 'Candidato registrado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro no register:", error.message);
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  }

  // Método para buscar todos os candidatos
  async getAllCandidates(req: Request, res: Response) {
    try {
      const candidates = await this.candidateRepository.findAll();
      res.status(200).json(candidates);
    } catch (error: unknown) {
      console.error('Erro ao buscar candidatos:', error);
      res.status(500).json({ message: 'Erro ao buscar candidatos' });
    }
  }

    //Método para buscar as imagens dos candidatos
    async getImages(req: Request, res: Response) {
      try {
        const session = getRavenDbConnection().openSession();
        const { id } = req.params;
    
        const candidateDoc = await session.load(id);
        if (!candidateDoc) {
          return res.status(404).json({ message: 'Candidato não encontrado' });
        }
    
        const metadata = session.advanced.getMetadataFor(candidateDoc);
        const attachments = metadata['@attachments'];
    
        if (!attachments || attachments.length === 0) {
          return res.status(404).json({ message: 'Nenhuma imagem encontrada para esse candidato' });
        }
    
        const attachmentName = attachments[0].name;
    
        const result = await session.advanced.attachments.get(id, attachmentName);
    
        if (!result || !result.data) {
          return res.status(404).send('Imagem não encontrada');
        }
    
        res.setHeader('Content-Type', result.details.contentType);
        result.data.pipe(res);
      } catch (error) {
        console.error('Erro ao buscar imagem do candidato:', error);
        res.status(500).json({ message: 'Erro ao buscar imagem do candidato' });
      }
    }
  

  // Método para buscar um candidato por ID
  async getCandidateById(req: Request, res: Response) {
    try {
      const candidateId = req.params.id;
      const candidate = await this.candidateRepository.findById(candidateId);

      if (candidate) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: 'Candidato não encontrado' });
      }
    } catch (error: unknown) {
      res.status(500).json({ message: 'Erro ao buscar candidato' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { recaptchaToken } = req.body;
  
      await this.deleteCandidate.execute(id, recaptchaToken);
  
      res.status(200).json({ message: 'Candidato deletado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  }




}
