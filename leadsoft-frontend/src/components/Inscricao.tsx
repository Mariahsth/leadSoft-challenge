"use client";
import {
  Botao,
  ContainerBotao,
  ContainerTitulo,
  Card,
  FormSection,
  Formulario,
  Input,
} from "@/styles/ReusableStyle";
import styled from "styled-components";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRef, useState } from "react";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { breakpoints } from "@/styles/breakPoints";
import { enviarInscricao } from "@/services/inscricaoService";
import { validateForm } from "@/utils/validateForm";
import { FormFields } from "@/types/FormFields";
import { resizeImage } from "@/utils/resizeImage";
import ImagePreview from "./ImagePreview";

const ImgFoguete = styled.img`
  width: 15em;
  height: auto;
  border-bottom: 1px solid var(--secundary-color12);
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

export default function Inscricao() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    cpf: "",
    email: "",
    dateOfBirth: "",
    caption: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!imageFile) {
      setFormErrors({ image: "Imagem obrigatória." });
      return;
    }

    // Atualiza o formData com a imagem redimensionada
    const updatedFormData = { ...formData, image: imageFile };

    // Agora valida com a imagem já redimensionada
    const { isValid, errors } = await validateForm(updatedFormData, imageFile);
    setFormErrors(errors);

    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    if (!executeRecaptcha) {
      console.error("Recaptcha not ready");
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

    setIsSubmitting(false);
    try {
      await enviarInscricao(dataToSend);
      alert("Candidatura enviada!");
      formRef.current?.reset();
      setFormData({
        name: "",
        cpf: "",
        email: "",
        dateOfBirth: "",
        caption: "",
        image: null,
      });

      setImageFile(null);
      setPreviewUrl(null);
    } catch (error: any) {
      if (error.field && error.message) {
        setFormErrors((prev) => ({ ...prev, [error.field]: error.message }));
      } else {
        alert(error.message || "Erro desconhecido");
      }
    }
  };

  return (
    <FormSection id="form">
      <ContainerTitulo ref={slideInRef} className="slide-in">
        <h2>Grandes jornadas começam com um clique</h2>
        <h3>Inscreva-se e transforme o amanhã</h3>
        <ImgFoguete src="/rocket3.png" alt="Foguete" />
      </ContainerTitulo>

      <Card ref={slideInRef2} className="slide-out">
        <Formulario onSubmit={handleSubmit} ref={formRef}>
          <h3>Cadastro</h3>

          <Input type="hidden" id="id" />
          <label htmlFor="name">Nome:</label>
          <Input
            type="text"
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          {formErrors.name && (
            <span style={{ color: "red" }}>{formErrors.name}</span>
          )}

          <label htmlFor="cpf">CPF:</label>
          <Input
            type="text"
            id="cpf"
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            required
          />
          {formErrors.cpf && (
            <span style={{ color: "red" }}>{formErrors.cpf}</span>
          )}

          <label htmlFor="email">E-mail:</label>
          <Input
            type="email"
            id="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          {formErrors.email && (
            <span style={{ color: "red" }}>{formErrors.email}</span>
          )}

          <label htmlFor="dateOfBirth">Data de nascimento:</label>
          <Input
            type="date"
            id="dateOfBirth"
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />
          {formErrors.dateOfBirth && (
            <span style={{ color: "red" }}>{formErrors.dateOfBirth}</span>
          )}

          <label htmlFor="caption">Legenda:</label>
          <Input
            type="text"
            id="caption"
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
            required
          />

          <label htmlFor="image">Imagem:</label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              try {
                const resized = await resizeImage(file);
                setImageFile(resized);
                setPreviewUrl(URL.createObjectURL(resized)); // Mostra o preview da versão redimensionada 1080x1080px
              } catch (err) {
                console.error(
                  "Erro ao redimensionar imagem para preview:",
                  err
                );
              }
            }}
            required
          />
          {formErrors.image && (
            <span style={{ color: "red" }}>{formErrors.image}</span>
          )}
          {previewUrl && <ImagePreview src={previewUrl} />}

          <ContainerBotao>
            <Botao type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Botao>
            <Botao
              type="reset"
              onClick={() => {
                setFormErrors({});
                setIsSubmitting(false);
                setPreviewUrl(null);
              }}
            >
              Cancelar
            </Botao>
          </ContainerBotao>
        </Formulario>
      </Card>
    </FormSection>
  );
}
