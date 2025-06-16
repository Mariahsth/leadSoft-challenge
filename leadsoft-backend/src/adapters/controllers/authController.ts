import { Request, Response } from "express";
import { RavenUserRepository } from "../../infrastructure/database/RavenUserRepository";
import { LoginUser } from "../../application/use-cases/LoginUser";

export async function loginController(req: Request, res: Response) {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ field: "user", message: "Credenciais ausentes" });
  }

  const repo = new RavenUserRepository();
  const loginUseCase = new LoginUser(repo);

  try {
    const token = await loginUseCase.execute(user, password);
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
