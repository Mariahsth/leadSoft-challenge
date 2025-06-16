"use client";
import {
  Botao,
  ContainerBotao,
  ContainerTitulo,
  Card,
  Formulario,
  Input,
  FormSection,
  ContainerColuna,
} from "@/styles/ReusableStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { SlideInTitleH2, SlideInTitleH3 } from "@/styles/slideAnimation";
import { CampoFormulario } from "./CampoFormulario";

export const PainelSection = styled(FormSection)`
  flex-direction: column;
`;

export default function PainelAdmin() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.1 });

  return (
    <PainelSection id="admin">
      <ContainerTitulo ref={slideInRef} className="slide-in">
        <SlideInTitleH2>Painel Admin </SlideInTitleH2>
        <ContainerColuna>
          <SlideInTitleH3>Acesso restrito </SlideInTitleH3>
          <RiLockFill color={"var(--primary-color2)"} aria-hidden />
        </ContainerColuna>
      </ContainerTitulo>
      <Card ref={slideInRef2} className="slide-out">
        <Formulario>
          <h3>Login</h3>

          <CampoFormulario
            id="user"
            label="Usuário:"
            type="text"
            required
            onChange={() => {}}
          />

          <CampoFormulario
            id="senha"
            label="Senha:"
            type="password"
            required
            onChange={() => {}}
          />

          <ContainerBotao>
            <Botao type="submit">Enviar</Botao>
            <Botao>Cancelar</Botao>
          </ContainerBotao>
        </Formulario>
      </Card>
    </PainelSection>
  );
}
