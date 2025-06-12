import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { Candidate } from '../../domain/entities/Candidate';
import { RecaptchaVerifier } from '../../domain/services/RecaptchaVerifier';
import { Caption } from '../../domain/value-objects/Caption';
import { DateOfBirth } from '../../domain/value-objects/DateOfBirth';
import { Email } from '../../domain/value-objects/Email';
import { Name } from '../../domain/value-objects/Name';
import { CPF } from '../../domain/value-objects/CPF';
import { Buffer } from 'buffer';


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
    imageBuffer: Buffer,
    recaptchaToken: string,
    mimeType: string,
    fileName: string
  ): Promise<void> {


    const isHuman = await this.recaptchaVerifier.verify(recaptchaToken);
    if (!isHuman) {
      throw new Error("Verificação reCAPTCHA falhou. Ação suspeita detectada.");
    }

    const candidate = new Candidate(
      new Name(name),
      new Email(email),
      new Caption(caption),
      new DateOfBirth(dateOfBirth),
      new CPF(cpf)
    );
  
    await this.candidateRepository.save(candidate, imageBuffer, mimeType, fileName);
  }
}
