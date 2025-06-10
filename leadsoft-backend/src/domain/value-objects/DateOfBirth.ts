import { validateDateOfBirth } from '../../utils/dateValidator';

export class DateOfBirth {
  private value: string;

  constructor(value: string) {
    if (!validateDateOfBirth(value)) {
      throw new Error('Data de nascimento inválida');
    }
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}
