export interface RecaptchaVerifier {
    verify(token: string, expectedAction?: string): Promise<boolean>;
  }
  