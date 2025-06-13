import { FormFields } from "@/types/FormFields";
import { validateCPF } from "./validadeCPF";
import { validateEmail } from "./validadeEmail";
import { validateBirthDate } from "./validateBirthDate";
import { validateName } from "./validateName";
import { ValidationResult } from "@/types/ValidationResult";

export const validateForm = (formData: FormFields): ValidationResult => {
  const errors: Partial<Record<keyof FormFields, string>> = {};

  const setError = (key: keyof FormFields, message: string) => {
    errors[key] = message;
  };

  if (!validateName(formData.name)) {
    setError("name", "Nome inválido.");
  }

  if (!validateCPF(formData.cpf)) {
    setError("cpf", "CPF inválido.");
  }

  if (!validateEmail(formData.email)) {
    setError("email", "Email inválido.");
  }

  if (!validateBirthDate(formData.dateOfBirth)) {
    setError("dateOfBirth", "A idade permitida é entre 18 e 120 anos.");
  }

  if (!formData.caption.trim()) {
    setError("caption", "Legenda é obrigatória.");
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
