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


    // const existingCandidate = await this.candidateRepository.findByCpf(cpf);
    // if (existingCandidate) {
    //   throw new Error('Candidato com este CPF já existe');
    // }
    
    
    console.log("Dados recebidos:", { name, cpf, email, dateOfBirth, caption, image: image.slice(0, 100) });
    // const isValidRecaptcha = await this.recaptchaVerifier.verify(recaptchaToken);
    // if (!isValidRecaptcha) {
    //   throw new Error('reCAPTCHA inválido');
    // }

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    console.log("Base64 da imagem (100 primeiros caracteres):", base64Image.slice(0, 100));
    console.log("Tamanho da base64:", base64Image.length);
    console.log("Validando nome...");
    const nome = new Name(name);
    
    console.log("Validando email...");
    const emailObj = new Email(email);
    
    console.log("Validando caption...");
    const legenda = new Caption(caption);
    
    console.log("Validando data de nascimento...");
    const nascimento = new DateOfBirth(dateOfBirth);
    
    console.log("Validando CPF:", cpf, "→", cpf.replace(/\D/g, ''));

    console.log("Validando CPF...");
    const cpfObj = new CPF(cpf);
    
    console.log("Validando imagem...");
    const imagem = new Image(base64Image);
    
    console.log("Criando candidato...");
    const candidate = new Candidate(
      nome,
      emailObj,
      legenda,
      nascimento,
      cpfObj,
      imagem
    );

    await this.candidateRepository.save(candidate);
  }
}
