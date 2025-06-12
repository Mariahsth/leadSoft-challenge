"use client";
import { Botao, ContainerBotao, ContainerTitulo, Card, Formulario, Input, FormSection } from "@/styles/FomularioStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { SlideInTitleH2, SlideInTitleH3 } from "@/styles/slideAnimation";

export const PainelSection=styled(FormSection)`
flex-direction:column;
`
export const ContainerTituloIcone=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
`
export default function PainelAdmin() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.1 });
  
  return (
    <PainelSection id='admin'>
        <ContainerTitulo ref={slideInRef} className="slide-in">
            <SlideInTitleH2 >Painel Admin </SlideInTitleH2>
            <ContainerTituloIcone>
              <SlideInTitleH3 >Acesso restrito </SlideInTitleH3>
              <RiLockFill color={'var(--primary-color2)'}/>

            </ContainerTituloIcone>

        </ContainerTitulo>
        <Card ref={slideInRef2} className="slide-out">
            <Formulario>
                <h3>Login</h3>

                <label htmlFor="usuario">Usuário:</label>
                <Input 
                type="text" 
                name="usuario"
                id="usuario" 
                placeholder="Insira seu e-mail" 
                required />
                <label htmlFor="senha">Senha:</label>
                <Input 
                type="text" 
                name="senha"
                id="senha" 
                placeholder="Insira sua senha" 
                required />

                <ContainerBotao>
                  <Botao type="submit" >Enviar</Botao>
                  <Botao>Cancelar</Botao>

                </ContainerBotao>

            </Formulario>
        </Card>
    </PainelSection>
  );
}
