import { UserRepository } from "../../domain/repositories/UserRepository";
import bcrypt from "bcrypt";
import { JwtService } from "../../infrastructure/services/JwtService";

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: string, password: string): Promise<string> {
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
