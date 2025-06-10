import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { Candidate } from '../../domain/entities/Candidate';
import { RecaptchaVerifier } from '../../domain/services/RecaptchaVerifier';
import { Caption } from '../../domain/value-objects/Caption';
import { DateOfBirth } from '../../domain/value-objects/DateOfBirth';
import { Email } from '../../domain/value-objects/Email';
import { Image } from '../../domain/value-objects/Image';
import { Name } from '../../domain/value-objects/Name';
import { CPF } from '../../domain/value-objects/CPF';

export class RegisterCandidate {
  private candidateRepository: CandidateRepository;
  private recaptchaVerifier: RecaptchaVerifier;

  constructor(
    candidateRepository: CandidateRepository,
    recaptchaVerifier: RecaptchaVerifier
  ) {
    this.candidateRepository = candidateRepository;
    this.recaptchaVerifier = recaptchaVerifier;
  }

  async execute(
    name: string,
    cpf: string,
    email: string,
    dateOfBirth: string,
    caption: string,
    image: string,
    recaptchaToken: string
  ): Promise<void> {
    // Verifica o reCAPTCHA
    const isValidRecaptcha = await this.recaptchaVerifier.verify(recaptchaToken);
    if (!isValidRecaptcha) {
      throw new Error('reCAPTCHA inválido');
    }

    // Cria a entidade Candidate
    const candidate = new Candidate(
      new Name(name),
      new Email(email),
      new Caption(caption),
      new DateOfBirth(dateOfBirth),
      new CPF(cpf),
      new Image(image)
    );

    // Salva o candidato no repositório
    await this.candidateRepository.save(candidate);
  }
}
