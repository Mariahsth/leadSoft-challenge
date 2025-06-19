"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(commentOnCandidate, commentRepository) {
        this.commentOnCandidate = commentOnCandidate;
        this.commentRepository = commentRepository;
    }
    async add(req, res) {
        const { candidateId, author, content, recaptchaToken } = req.body;
        if (!candidateId || !author || !content || !recaptchaToken) {
            return res.status(400).json({ message: "Dados incompletos" });
        }
        try {
            await this.commentOnCandidate.execute(candidateId, author, content, recaptchaToken);
            res.status(201).json({ message: "Comentário adicionado com sucesso" });
        }
        catch (err) {
            res.status(500).json({ message: err.message || "Erro ao comentar" });
        }
    }
    async getByCandidate(req, res) {
        const { candidateId } = req.params;
        try {
            const comments = await this.commentRepository.getByCandidateId(candidateId);
            res.json(comments);
        }
        catch (err) {
            res.status(500).json({ message: err.message || "Erro ao buscar comentários" });
        }
    }
    async deleteById(req, res) {
        const { id } = req.params;
        console.log("Tentando deletar comentário com id:", id);
        try {
            await this.commentRepository.deleteById(id);
            res.status(200).json({ message: "Comentário deletado com sucesso!" });
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao deletar comentário" });
        }
    }
}
exports.CommentController = CommentController;
