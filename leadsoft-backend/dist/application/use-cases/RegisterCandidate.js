"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCandidate = void 0;
const Candidate_1 = require("../../domain/entities/Candidate");
const Caption_1 = require("../../domain/value-objects/Caption");
const DateOfBirth_1 = require("../../domain/value-objects/DateOfBirth");
const Email_1 = require("../../domain/value-objects/Email");
const Image_1 = require("../../domain/value-objects/Image");
const Name_1 = require("../../domain/value-objects/Name");
const CPF_1 = require("../../domain/value-objects/CPF");
class RegisterCandidate {
    constructor(candidateRepository, recaptchaVerifier) {
        this.candidateRepository = candidateRepository;
        this.recaptchaVerifier = recaptchaVerifier;
    }
    async execute(name, cpf, email, dateOfBirth, caption, image, recaptchaToken) {
        const existingCandidate = await this.candidateRepository.findById('candidates/' + cpf);
        if (existingCandidate) {
            throw new Error('Candidato com este CPF já existe');
        }
        const isValidRecaptcha = await this.recaptchaVerifier.verify(recaptchaToken);
        if (!isValidRecaptcha) {
            throw new Error('reCAPTCHA inválido');
        }
        const candidate = new Candidate_1.Candidate(new Name_1.Name(name), new Email_1.Email(email), new Caption_1.Caption(caption), new DateOfBirth_1.DateOfBirth(dateOfBirth), new CPF_1.CPF(cpf), new Image_1.Image(image.toString('base64')));
        await this.candidateRepository.save(candidate);
    }
}
exports.RegisterCandidate = RegisterCandidate;
