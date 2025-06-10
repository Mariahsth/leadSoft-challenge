import { validateEmail } from '../../utils/emailValidator';

export class Email {
  private value: string;

  constructor(value: string) {
    if (!validateEmail(value)) {
      throw new Error('E-mail inválido');
    }
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}
