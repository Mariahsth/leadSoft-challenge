"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateController = void 0;
class CandidateController {
    constructor(registerCandidate, candidateRepository) {
        this.registerCandidate = registerCandidate;
        this.candidateRepository = candidateRepository;
    }
    // Método para registrar um candidato
    async register(req, res) {
        try {
            const { name, cpf, email, dateOfBirth, caption, image, recaptchaToken } = req.body;
            // Chama o caso de uso para registrar o candidato
            await this.registerCandidate.execute(name, cpf, email, dateOfBirth, caption, image, recaptchaToken);
            res.status(201).json({ message: 'Candidato registrado com sucesso!' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Erro desconhecido' });
            }
        }
    }
    // Método para buscar todos os candidatos
    async getAllCandidates(req, res) {
        try {
            const candidates = await this.candidateRepository.findAll();
            res.status(200).json(candidates);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar candidatos' });
        }
    }
    // Método para buscar um candidato por ID
    async getCandidateById(req, res) {
        try {
            const candidateId = req.params.id;
            const candidate = await this.candidateRepository.findById(candidateId);
            if (candidate) {
                res.status(200).json(candidate);
            }
            else {
                res.status(404).json({ message: 'Candidato não encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar candidato' });
        }
    }
}
exports.CandidateController = CandidateController;
