export interface RecaptchaVerifier {
    // Método para verificar se o token de reCAPTCHA é válido
    verify(token: string, expectedAction?: string): Promise<boolean>;
  }
  