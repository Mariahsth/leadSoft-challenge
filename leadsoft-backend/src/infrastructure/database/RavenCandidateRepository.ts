import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { Candidate } from '../../domain/entities/Candidate';
import { DocumentStore } from 'ravendb';  // Adapte isso para o seu setup com RavenDB

export class RavenCandidateRepository implements CandidateRepository {
  private store: DocumentStore;

  constructor(store: DocumentStore) {
    this.store = store;
  }

  async save(candidate: Candidate): Promise<void> {
    const session = this.store.openSession();
    await session.store(candidate);
    await session.saveChanges();
  }

  async findById(id: string): Promise<Candidate | null> {
    const session = this.store.openSession();
    return await session.load<Candidate>(id);
  }

  async delete(id: string): Promise<void> {
    const session = this.store.openSession();
    const candidate = await session.load<Candidate>(id);
    if (candidate) {
      await session.delete(candidate);
      await session.saveChanges();
    }
  }

}
