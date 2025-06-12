"use client";
import { breakpoints } from "@/styles/breakPoints";
import {
  Botao,
  ContainerBotao,
  ContainerTitulo,
  Card,
  FormSection,
  Formulario,
  Input
} from "@/styles/FomularioStyle";
import styled from "styled-components";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";

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
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    dateOfBirth: "",
    caption: "",
    image: "",
  });

  const fileReaderRef = useRef<FileReader | null>(null);

  useEffect(() => {
    return () => {
      if (fileReaderRef.current && fileReaderRef.current.readyState === 1) {
        fileReaderRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error("Recaptcha not ready");
      return;
    }

    const token = await executeRecaptcha("submit");

    const data = {
      ...formData,
      recaptchaToken: token,
    };
    try {
      console.log(data);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, data);
      console.log('Cadastro enviado com sucesso', response.data);
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error.message);
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
        <Formulario onSubmit={handleSubmit}>
          <h3>Cadastro</h3>

          <Input type="hidden" id="id" />
          <label htmlFor="name">Nome completo:</label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Insira seu nome completo"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <label htmlFor="cpf">CPF:</label>
          <Input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Insira seu CPF"
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Insira seu e-mail"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label htmlFor="dateOfBirth">Data de nascimento:</label>
          <Input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Insira sua data de nascimento:"
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            required
          />

          <label htmlFor="caption">Legenda:</label>
          <Input
            type="text"
            name="caption"
            id="caption"
            placeholder="Insira uma legenda criativa:"
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
            required
          />

          <label htmlFor="image">Imagem:</label>
          <Input
            type="file"
            name="image"
            id="image"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                fileReaderRef.current = reader;

                reader.onloadend = () => {
                  setFormData((prev) => ({
                    ...prev,
                    image: reader.result as string,
                  }));
                };

                reader.readAsDataURL(file);
              }
            }}
            required
          />

          <ContainerBotao>
            <Botao type="submit">Enviar</Botao>
            <Botao type="reset">Cancelar</Botao>
          </ContainerBotao>
        </Formulario>
      </Card>
    </FormSection>
  );
}
