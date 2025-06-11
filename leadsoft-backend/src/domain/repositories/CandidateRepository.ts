import { Candidate } from "../entities/Candidate";

export interface CandidateRepository {
  // Método para salvar um candidato
  save(candidate: Candidate): Promise<void>;

  // Método para encontrar todos os candidatos 
  findAll(): Promise<Candidate[]>;

  // Método para encontrar um candidato pelo ID
  findById(id: string): Promise<Candidate | null>;

  // Método para excluir um candidato pelo ID
  delete(id: string): Promise<void>;

  // Método para encontrar um candidato pelo cpf
  findByCpf(cpf: string): Promise<Candidate | null>;
}
