import { validateCaption } from '../../utils/captionValidator';

export class Caption {
  private value: string;

  constructor(value: string) {
    if (!validateCaption(value)) {
      throw new Error('Legenda inválida');
    }
    this.value = value;
  }

  public getValue() {
    return this.value;
  }
}
