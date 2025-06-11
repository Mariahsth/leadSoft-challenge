import { RecaptchaVerifier } from '../../domain/services/RecaptchaVerifier';
import axios from 'axios';

export class GoogleRecaptchaVerifier implements RecaptchaVerifier {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async verify(token: string): Promise<boolean> {
    // const response = await axios.post(
    //   `https://www.google.com/recaptcha/api/siteverify`,
    //   null,
    //   {
    //     params: {
    //       secret: this.secretKey,
    //       response: token,
    //     },
    //   }
    // );
    
    // return response.data.success;
    return true
  }
}
