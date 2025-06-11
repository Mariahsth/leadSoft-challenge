"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavenCandidateRepository = void 0;
const Candidate_1 = require("../../domain/entities/Candidate");
const ravenDbConfig_1 = require("../../config/ravenDbConfig");
class RavenCandidateRepository {
    constructor() {
        this.store = (0, ravenDbConfig_1.getRavenDbConnection)();
    }
    // Método para salvar um candidato
    async save(candidate) {
        const session = this.store.openSession();
        try {
            await session.store(candidate, candidate.id); // Armazena o candidato com um id único
            await session.saveChanges();
        }
        catch (error) {
            console.error('Erro ao salvar o candidato:', error);
            throw new Error('Não foi possível salvar o candidato');
        }
    }
    // Método para buscar um candidato por ID
    async findById(id) {
        const session = this.store.openSession();
        const candidate = await session.load(id);
        return candidate ? candidate : null;
    }
    // Método para buscar todos os candidatos
    async findAll() {
        const session = this.store.openSession();
        try {
            const candidates = await session.query(Candidate_1.Candidate).all();
            return candidates || [];
        }
        catch (error) {
            console.error('Erro ao buscar candidatos:', error);
            throw new Error('Erro ao consultar candidatos no banco');
        }
    }
    // Método para deletar um candidato
    async delete(id) {
        const session = this.store.openSession();
        const candidate = await session.load(id);
        if (candidate) {
            await session.delete(candidate);
            await session.saveChanges();
        }
    }
    // Método para buscar um candidato pelo cpf
    async findByCpf(cpf) {
        const session = this.store.openSession();
        try {
            const result = await session.query({ collection: 'Candidates' })
                .whereEquals('cpf._value', cpf)
                .firstOrNull();
            return result;
        }
        catch (error) {
            console.error('Erro ao buscar candidato por CPF:', error);
            throw new Error('Erro ao consultar candidato por CPF');
        }
    }
}
exports.RavenCandidateRepository = RavenCandidateRepository;
