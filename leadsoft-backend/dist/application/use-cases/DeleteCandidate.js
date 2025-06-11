"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCandidate = void 0;
class DeleteCandidate {
    constructor(candidateRepository, recaptchaVerifier) {
        this.candidateRepository = candidateRepository;
        this.recaptchaVerifier = recaptchaVerifier;
    }
    async execute(id, recaptchaToken) {
        const existingCandidate = await this.candidateRepository.findById(id);
        if (!existingCandidate) {
            throw new Error('Não existe candidato com esse ID');
        }
        const isValidRecaptcha = await this.recaptchaVerifier.verify(recaptchaToken);
        if (!isValidRecaptcha) {
            throw new Error('reCAPTCHA inválido');
        }
        await this.candidateRepository.delete(id);
    }
}
exports.DeleteCandidate = DeleteCandidate;
