import { Request, Response } from 'express';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';
import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { DeleteCandidate } from '../../application/use-cases/DeleteCandidate';

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
    try {
      const { name, cpf, email, dateOfBirth, caption, image, recaptchaToken } = req.body;
      
      // Chama o caso de uso para registrar o candidato
      await this.registerCandidate.execute(name, cpf, email, dateOfBirth, caption, image, recaptchaToken);
      
      res.status(201).json({ message: 'Candidato registrado com sucesso!' });
    } catch (error: unknown) {
      if (error instanceof Error) {
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
