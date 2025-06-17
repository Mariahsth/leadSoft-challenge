import { UserRepository } from "../../domain/repositories/UserRepository";
import bcrypt from "bcrypt";
import { JwtService } from "../../infrastructure/services/JwtService";
import { RecaptchaVerifier } from "../../domain/services/RecaptchaVerifier";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private recaptchaVerifier: RecaptchaVerifier
  ) {}

  async execute(user: string, password: string, recaptchaToken: string): Promise<string> {
    const isHuman = await this.recaptchaVerifier.verify(recaptchaToken, "login");
    if (!isHuman) {
      throw { field: "recaptcha", message: "Verificação reCAPTCHA falhou" };
    }
    
    
    const existingUser = await this.userRepository.findByEmail(user);
  
    if (!existingUser) {
      throw { field: "user", message: "Usuário não encontrado" };
    }
  
    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      throw { field: "password", message: "Senha incorreta" };
    }
  
    return JwtService.generateToken({ id: existingUser.id, user: existingUser });
  }
}
