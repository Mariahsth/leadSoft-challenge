"use client";
import { BotaoForm, ContainerBotao, ContainerTitulo, FormCard, Formulario, Input } from "@/styles/FomularioStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { SlideInTitleH2, SlideInTitleH3 } from "@/styles/slideAnimation";

export const FormSection=styled.section`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
width:100%;
padding:9rem 1rem;
text-align:center;
gap:1rem;
border: 1px solid var(--secundary-color12);
`
export const ContainerTituloIcone=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
`
export default function PainelAdmin() {
  const slideInRef = useSlideInOnView("slide-in", { threshold: 0.2 });
  const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.2 });
  
  return (
    <FormSection id='admin'>
        <ContainerTitulo ref={slideInRef} className="slide-in">
            <SlideInTitleH2 >Painel Admin </SlideInTitleH2>
            <ContainerTituloIcone>
              <SlideInTitleH3 >Acesso restrito </SlideInTitleH3>
              <RiLockFill color={'var(--primary-color2)'}/>

            </ContainerTituloIcone>

        </ContainerTitulo>
        <FormCard ref={slideInRef2} className="slide-out">
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
                  <BotaoForm type="submit" >Enviar</BotaoForm>
                  <BotaoForm>Cancelar</BotaoForm>

                </ContainerBotao>

            </Formulario>
        </FormCard>
    </FormSection>
  );
}
