export class Image {
  private value: string;  

  constructor(value: string) {  
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
