import { CandidateRepository } from "../../domain/repositories/CandidateRepository";
import { Candidate } from "../../domain/entities/Candidate";
import { DocumentStore } from "ravendb";
import { getRavenDbConnection } from "../config/ravenDbConfig";
import { Buffer } from "buffer";
import fileType from "file-type";
import { PutAttachmentOperation } from "ravendb";

export class RavenCandidateRepository implements CandidateRepository {
  private store: DocumentStore;

  constructor() {
    this.store = getRavenDbConnection();
  }

  // Método para salvar um candidato
  async save(
    candidate: Candidate,
    imageBuffer: Buffer,
    mimeType: string,
    fileName: string
  ): Promise<void> {
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
    session.advanced.getMetadataFor(candidateDoc)["@collection"] = "Candidates";
    await session.saveChanges();

    const detectedType = await fileType.fromBuffer(imageBuffer);
    const realMimeType = detectedType?.mime || mimeType;

    const operation = new PutAttachmentOperation(
      docId,
      fileName,
      imageBuffer,
      realMimeType
    );
    await this.store.operations.send(operation);
  }

  async findById(id: string): Promise<Candidate | null> {
    const session = this.store.openSession();
    const candidate = await session.load<Candidate>(id);
    return candidate ? candidate : null;
  }

  async findAll(): Promise<Candidate[]> {
    const session = this.store.openSession();
    try {
      const candidates = await session.query(Candidate).all();
      return candidates || [];
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      throw new Error("Erro ao consultar candidatos no banco");
    }
  }

  async delete(id: string): Promise<void> {
    const session = this.store.openSession();
    const candidate = await session.load<Candidate>(id);
    if (candidate) {
      await session.delete(candidate);
      await session.saveChanges();
    }
  }

  async findByCpf(cpf: string): Promise<Candidate | null> {
    const session = this.store.openSession();

    try {
      const result = await session
        .query<Candidate>({ collection: "Candidates" })
        .whereEquals("cpf", cpf)
        .firstOrNull();

      return result;
    } catch (error) {
      console.error("Erro ao buscar candidato por CPF:", error);
      throw new Error("Erro ao consultar candidato por CPF");
    }
  }
  async findByEmail(email: string): Promise<Candidate | null> {
    const session = this.store.openSession();

    try {
      const result = await session
        .query<Candidate>({ collection: "Candidates" })
        .whereEquals("email", email)
        .firstOrNull();

      return result;
    } catch (error) {
      console.error("Erro ao buscar candidato por email:", error);
      throw new Error("Erro ao consultar candidato por email");
    }
  }
}
