import { CandidateRepository } from '../../domain/repositories/CandidateRepository';

export class DeleteCandidate {
  private candidateRepository: CandidateRepository;

  constructor(
    candidateRepository: CandidateRepository,
  ) {
    this.candidateRepository = candidateRepository;
  }

  async execute(id: string): Promise<void> {
    const existingCandidate = await this.candidateRepository.findById(id);

    if (!existingCandidate) {
      throw new Error('Não existe candidato com esse ID');
    }


    await this.candidateRepository.delete(id);
  }
}
