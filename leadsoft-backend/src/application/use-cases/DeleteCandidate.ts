import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { RecaptchaVerifier } from '../../domain/services/RecaptchaVerifier';

export class DeleteCandidate {
  private candidateRepository: CandidateRepository;
  private recaptchaVerifier: RecaptchaVerifier;

  constructor(
    candidateRepository: CandidateRepository,
    recaptchaVerifier: RecaptchaVerifier
  ) {
    this.candidateRepository = candidateRepository;
    this.recaptchaVerifier = recaptchaVerifier;
  }

  async execute(id: string, recaptchaToken: string): Promise<void> {
    const existingCandidate = await this.candidateRepository.findById(id);

    if (!existingCandidate) {
      throw new Error('Não existe candidato com esse ID');
    }

    const isValidRecaptcha = await this.recaptchaVerifier.verify(recaptchaToken);
    if (!isValidRecaptcha) {
      throw new Error('reCAPTCHA inválido');
    }

    await this.candidateRepository.delete(id);
  }
}
