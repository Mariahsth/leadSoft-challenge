"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentOnCandidate = void 0;
class CommentOnCandidate {
    constructor(commentRepository, recaptchaVerifier) {
        this.commentRepository = commentRepository;
        this.recaptchaVerifier = recaptchaVerifier;
    }
    async execute(candidateId, author, content, recaptchaToken) {
        const comment = {
            candidateId,
            author,
            content,
            createdAt: new Date().toISOString()
        };
        const isHuman = await this.recaptchaVerifier.verify(recaptchaToken, "submit");
        if (!isHuman) {
            throw new Error("Verificação reCAPTCHA falhou. Ação suspeita detectada.");
        }
        if (content.length > 150) {
            throw new Error("Comentário excede o limite de 150 caracteres");
        }
        await this.commentRepository.add(comment);
    }
}
exports.CommentOnCandidate = CommentOnCandidate;
