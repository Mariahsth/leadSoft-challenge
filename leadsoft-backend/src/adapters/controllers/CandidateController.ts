import { Request, Response } from 'express';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';
import { CandidateRepository } from '../../domain/repositories/CandidateRepository';

export class CandidateController {
  private registerCandidate: RegisterCandidate;
  private candidateRepository: CandidateRepository;

  constructor(registerCandidate: RegisterCandidate, candidateRepository: CandidateRepository) {
    this.registerCandidate = registerCandidate;
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
}
