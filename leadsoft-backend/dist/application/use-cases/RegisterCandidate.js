"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCandidate = void 0;
const Candidate_1 = require("../../domain/entities/Candidate");
const Caption_1 = require("../../domain/value-objects/Caption");
const DateOfBirth_1 = require("../../domain/value-objects/DateOfBirth");
const Email_1 = require("../../domain/value-objects/Email");
const Name_1 = require("../../domain/value-objects/Name");
const CPF_1 = require("../../domain/value-objects/CPF");
class RegisterCandidate {
    constructor(candidateRepository, recaptchaVerifier) {
        this.candidateRepository = candidateRepository;
        this.recaptchaVerifier = recaptchaVerifier;
    }
    async execute(name, cpf, email, dateOfBirth, caption, imageBuffer, recaptchaToken, mimeType, fileName) {
        const isHuman = await this.recaptchaVerifier.verify(recaptchaToken, "submit");
        if (!isHuman) {
            throw new Error("Verificação reCAPTCHA falhou. Ação suspeita detectada.");
        }
        const candidate = new Candidate_1.Candidate(new Name_1.Name(name), new Email_1.Email(email), new Caption_1.Caption(caption), new DateOfBirth_1.DateOfBirth(dateOfBirth), new CPF_1.CPF(cpf));
        await this.candidateRepository.save(candidate, imageBuffer, mimeType, fileName);
    }
}
exports.RegisterCandidate = RegisterCandidate;
