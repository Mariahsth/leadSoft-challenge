import { useCallback, useState, useRef } from "react";
import { FormFields } from "@/types/FormFields";
import { validateForm } from "@/utils/validateForm";
import { resizeImage } from "@/utils/resizeImage";

export function useForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    cpf: "",
    email: "",
    dateOfBirth: "",
    caption: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = useCallback(
    (key: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resized = await resizeImage(file);
      setImageFile(resized);
      setPreviewUrl(URL.createObjectURL(resized));
    } catch (err) {
      console.error("Erro ao redimensionar imagem:", err);
    }
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      cpf: "",
      email: "",
      dateOfBirth: "",
      caption: "",
      image: null,
    });
    setFormErrors({});
    setImageFile(null);
    setPreviewUrl(null);
    setIsSubmitting(false);
    formRef.current?.reset();
  };

  const validate = async () => {
    const updated = { ...formData, image: imageFile };
    const result = await validateForm(updated, imageFile);
    setFormErrors(result.errors);
    return result.isValid;
  };

  return {
    formData,
    formErrors,
    imageFile,
    previewUrl,
    isSubmitting,
    formRef,
    setIsSubmitting,
    setFormErrors,
    updateField,
    handleImageChange,
    resetForm,
    validate,
  };
}
