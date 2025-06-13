export const validateName = (name: string): boolean => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿÇçÑñ\s~]+$/u;
    return regex.test(name) && name.length >= 3 && name.length <= 100;
  };
  