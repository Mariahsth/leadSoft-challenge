import { RecaptchaVerifier } from '../../domain/services/RecaptchaVerifier';
import axios from 'axios';

export class GoogleRecaptchaVerifier implements RecaptchaVerifier {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async verify(token: string, expectedAction: string = "submit"): Promise<boolean> {
    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: this.secretKey,
            response: token,
          },
        }
      );
  
      const data = response.data;
  
      console.log("🔍 Resultado reCAPTCHA:", data);
  
      const isValid =
        data.success === true &&
        data.action === expectedAction &&
        data.score >= 0.5;
  
      if (!isValid) {
        console.warn("❌ Verificação reCAPTCHA inválida:", {
          success: data.success,
          action: data.action,
          score: data.score,
          errors: data["error-codes"],
        });
      }
  
      return isValid;
    } catch (err) {
      console.error("❌ Erro ao verificar reCAPTCHA:", err);
      return false;
    }
  }
}
