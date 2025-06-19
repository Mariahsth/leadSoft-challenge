"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCandidate = void 0;
class DeleteCandidate {
    constructor(candidateRepository) {
        this.candidateRepository = candidateRepository;
    }
    async execute(id) {
        const existingCandidate = await this.candidateRepository.findById(id);
        if (!existingCandidate) {
            throw new Error('Não existe candidato com esse ID');
        }
        await this.candidateRepository.delete(id);
    }
}
exports.DeleteCandidate = DeleteCandidate;
