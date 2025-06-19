"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavenCandidateRepository = void 0;
const Candidate_1 = require("../../domain/entities/Candidate");
const ravenDbConfig_1 = require("../../config/ravenDbConfig");
const file_type_1 = require("file-type");
const ravendb_1 = require("ravendb");
class RavenCandidateRepository {
    constructor() {
        this.store = (0, ravenDbConfig_1.getRavenDbConnection)();
    }
    // Método para salvar um candidato
    async save(candidate, imageBuffer, mimeType, fileName) {
        const session = this.store.openSession();
        const candidateDoc = {
            id: candidate.id,
            name: candidate.name.getValue(),
            email: candidate.email.getValue(),
            caption: candidate.caption.getValue(),
            dateOfBirth: candidate.dateOfBirth.getValue(),
            cpf: candidate.cpf.getValue(),
        };
        const docId = candidate.id;
        await session.store(candidateDoc, docId);
        session.advanced.getMetadataFor(candidateDoc)['@collection'] = 'Candidates';
        await session.saveChanges();
        // 🔍 Detecta mimetype real
        const detectedType = await (0, file_type_1.fileTypeFromBuffer)(imageBuffer);
        const realMimeType = detectedType?.mime || mimeType;
        console.log('🧪 MimeType real:', realMimeType);
        // 🧩 Usa PutAttachmentOperation
        const operation = new ravendb_1.PutAttachmentOperation(docId, fileName, imageBuffer, realMimeType);
        await this.store.operations.send(operation);
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
                .whereEquals('cpf', cpf)
                .firstOrNull();
            return result;
        }
        catch (error) {
            console.error('Erro ao buscar candidato por CPF:', error);
            throw new Error('Erro ao consultar candidato por CPF');
        }
    }
    // Método para buscar um candidato pelo email
    async findByEmail(email) {
        const session = this.store.openSession();
        try {
            const result = await session.query({ collection: 'Candidates' })
                .whereEquals('email', email)
                .firstOrNull();
            return result;
        }
        catch (error) {
            console.error('Erro ao buscar candidato por email:', error);
            throw new Error('Erro ao consultar candidato por email');
        }
    }
}
exports.RavenCandidateRepository = RavenCandidateRepository;
