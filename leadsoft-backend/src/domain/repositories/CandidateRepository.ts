import { Candidate } from "../entities/Candidate";
import { Buffer } from 'buffer';

export interface CandidateRepository {
  save(candidate: Candidate, imageBuffer: Buffer, mimeType: string, fileName: string): Promise<void>;

  findAll(): Promise<Candidate[]>;

  findById(id: string): Promise<Candidate | null>;

  delete(id: string): Promise<void>;

  findByCpf(cpf: string): Promise<Candidate | null>;
  
  findByEmail(email: string): Promise<Candidate | null>;
}
