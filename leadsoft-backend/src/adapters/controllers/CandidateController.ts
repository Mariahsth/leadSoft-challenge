import { Request, Response } from 'express';
import { RegisterCandidate } from '../../application/use-cases/RegisterCandidate';

export class CandidateController {
  private registerCandidate: RegisterCandidate;

  constructor(registerCandidate: RegisterCandidate) {
    this.registerCandidate = registerCandidate;
  }

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
      }    }
  }
}
