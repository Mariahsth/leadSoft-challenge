export function validateName(name: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name) && name.length >= 3 && name.length <= 100;
  }
  