import { Request, Response } from "express";
import { CommentOnCandidate } from "../../application/use-cases/CommentOnCandidate";
import { CommentRepository } from "../../domain/repositories/CommentRepository";

export class CommentController {
  constructor(
    private commentOnCandidate: CommentOnCandidate,
    private commentRepository: CommentRepository
  ) {}

  async add(req: Request, res: Response) {
    const { candidateId, author, content, recaptchaToken } = req.body;

    if (!candidateId || !author || !content || !recaptchaToken) {
      return res.status(400).json({ message: "Dados incompletos" });
    }
    try {
      await this.commentOnCandidate.execute(candidateId, author, content, recaptchaToken);
      res.status(201).json({ message: "Comentário adicionado com sucesso" });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Erro ao comentar" });
    }
  }

  async getByCandidate(req: Request, res: Response) {
    const { candidateId } = req.params;
    try {
      const comments = await this.commentRepository.getByCandidateId(candidateId);
      res.json(comments);
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Erro ao buscar comentários" });
    }
  }
}
