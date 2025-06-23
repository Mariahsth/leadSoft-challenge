export const validateName = (name: string): boolean => {
  // Proibindo numeros e pontuação e quantidade de caracteres
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿÇçÑñ\s~]+$/u;
    return regex.test(name) && name.length >= 3 && name.length <= 100;
  };
  