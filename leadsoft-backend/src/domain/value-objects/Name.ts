import { validateName } from '../../utils/nameValidator';

export class Name {
  private value: string;

  constructor(value: string) {
    if (!validateName(value)) {
      throw new Error('Nome inválido');
    }
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}
