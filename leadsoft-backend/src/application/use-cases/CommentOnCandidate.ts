import { Comment } from "../../domain/entities/Comment";
import { CommentRepository } from "../../domain/repositories/CommentRepository";
import { RecaptchaVerifier } from "../../domain/services/RecaptchaVerifier";

export class CommentOnCandidate {
  constructor(
    private commentRepository: CommentRepository, 
    private recaptchaVerifier: RecaptchaVerifier
  ) {}

  async execute(candidateId: string, author: string, content: string, recaptchaToken: string): Promise<void> {
    const comment: Comment = {
      candidateId,
      author,
      content,
      createdAt: new Date().toISOString()
    };
    const isHuman = await this.recaptchaVerifier.verify(recaptchaToken, "submit");
    if (!isHuman) {
      throw new Error("Verificação reCAPTCHA falhou. Ação suspeita detectada.");
    }
    if (content.length > 300) {
      throw new Error("Comentário excede o limite de 300 caracteres");
    }

    await this.commentRepository.add(comment);
  }
}
