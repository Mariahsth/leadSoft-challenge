import { FormFields } from "./FormFields";

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof FormFields, string>>;
}
