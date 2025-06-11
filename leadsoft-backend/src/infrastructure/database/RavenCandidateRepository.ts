import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { Candidate } from '../../domain/entities/Candidate';
import { DocumentStore } from 'ravendb'; 
import { getRavenDbConnection } from '../../config/ravenDbConfig';

export class RavenCandidateRepository implements CandidateRepository {
  private store: DocumentStore;

  constructor() {
    this.store = getRavenDbConnection();
  }

  // Método para salvar um candidato
  async save(candidate: Candidate): Promise<void> {
    const session = this.store.openSession();
    try {
      await session.store(candidate, candidate.id); // Armazena o candidato com um id único
      await session.saveChanges();
    } catch (error) {
      console.error('Erro ao salvar o candidato:', error);
      throw new Error('Não foi possível salvar o candidato');
    }
  }

  // Método para buscar um candidato por ID
  async findById(id: string): Promise<Candidate | null> {
    const session = this.store.openSession();
    const candidate = await session.load<Candidate>(id);
    return candidate ? candidate : null;  
  }

  // Método para buscar todos os candidatos
  async findAll(): Promise<Candidate[]> {
    const session = this.store.openSession();
    try {
      const candidates = await session.query(Candidate).all(); 
      return candidates || [];
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
      throw new Error('Erro ao consultar candidatos no banco');
    }
  }

  // Método para deletar um candidato
  async delete(id: string): Promise<void> {
    const session = this.store.openSession();
    const candidate = await session.load<Candidate>(id);
    if (candidate) {
      await session.delete(candidate);
      await session.saveChanges();
    }
  }

  // Método para buscar um candidato pelo cpf
  async findByCpf(cpf: string): Promise<Candidate | null> {
    const session = this.store.openSession();
  
    try {
      const result = await session.query<Candidate>({ collection: 'Candidates' })
        .whereEquals('cpf.value', cpf) 
        .firstOrNull();
  
      return result;
    } catch (error) {
      console.error('Erro ao buscar candidato por CPF:', error);
      throw new Error('Erro ao consultar candidato por CPF');
    }
  }
}
