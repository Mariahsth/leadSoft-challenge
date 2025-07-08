"use client";
import {
  ContainerBotao,
  Botao,
  Card,
  Formulario,
  Input,
} from "@/styles/ReusableStyle";
import { enviarInscricao } from "@/services/inscricaoService";
import ImagePreview from "../ImagePreview";
import { CampoFormulario } from "../CampoFormulario";
import { useForm } from "@/hooks/useForm";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect } from "react";
import { FormFields } from "@/types/FormFields";

export default function InscricaoClient() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
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
  } = useForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageFile) {
      setFormErrors({ image: "Imagem obrigatória." });
      setIsSubmitting(false);
      return;
    }

    const isValid = await validate();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    if (!executeRecaptcha) {
      console.error("Recaptcha not ready");
      setIsSubmitting(false);
      return;
    }

    const token = await executeRecaptcha("submit");

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("cpf", formData.cpf);
    dataToSend.append("email", formData.email);
    dataToSend.append("dateOfBirth", formData.dateOfBirth);
    dataToSend.append("caption", formData.caption);
    dataToSend.append("recaptchaToken", token);
    dataToSend.append("image", imageFile);

    try {
      await enviarInscricao(dataToSend);
      setIsSubmitting(false);
      alert("Candidatura enviada!");
      resetForm();
    } catch (error: any) {
      if (typeof error === "object" && error !== null) {
        if ("field" in error && "message" in error) {
          setFormErrors((prev) => ({
            ...prev,
            [error.field as keyof FormFields]: error.message,
          }));
          return;
        }

        if ("errors" in error && typeof error.errors === "object") {
          setFormErrors(error.errors);
          return;
        }
      }

      alert(error.message || "Erro desconhecido");
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Card ref={slideInRef} className="slide-out">
      <Formulario onSubmit={handleSubmit} ref={formRef}>
        <h3>Cadastro</h3>

        <Input type="hidden" id="id" />
        <CampoFormulario
          id="name"
          label="Nome:"
          value={formData.name}
          error={formErrors.name}
          required
          onChange={updateField("name")}
        />
        <CampoFormulario
          id="cpf"
          label="CPF:"
          value={formData.cpf}
          error={formErrors.cpf}
          required
          onChange={updateField("cpf")}
        />
        <CampoFormulario
          id="email"
          label="E-mail:"
          value={formData.email}
          error={formErrors.email}
          required
          onChange={updateField("email")}
        />
        <CampoFormulario
          id="dateOfBirth"
          label="Data de nascimento:"
          type="date"
          value={formData.dateOfBirth}
          error={formErrors.dateOfBirth}
          required
          onChange={updateField("dateOfBirth")}
        />
        <CampoFormulario
          id="caption"
          label="Legenda:"
          value={formData.caption}
          error={formErrors.caption}
          required
          onChange={updateField("caption")}
        />
        <CampoFormulario
          id="image"
          label="Imagem:"
          accept="image/*"
          type="file"
          error={formErrors.image}
          required
          onChange={handleImageChange}
        />
        {previewUrl && <ImagePreview src={previewUrl} />}

        <ContainerBotao>
          <Botao
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Botao>
          <Botao type="reset" onClick={resetForm}>
            Cancelar
          </Botao>
        </ContainerBotao>
      </Formulario>
    </Card>
  );
}
