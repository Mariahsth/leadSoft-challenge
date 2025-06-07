"use client";
import { BotaoForm, ContainerBotao, ContainerTitulo, FormCard, Formulario, Input } from "@/styles/FomularioStyle";
import styled from "styled-components";
import { RiLockFill } from "react-icons/ri";

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
export const ContainerTituloIcone=styled.section`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;

`
export default function PainelAdmin() {
  return (
    <FormSection id='admin'>
        <ContainerTitulo>
            <h2>Painel Admin </h2>
            <ContainerTituloIcone>
              <h3>Acesso restrito </h3>
              <RiLockFill color={'var(--primary-color2)'}/>

            </ContainerTituloIcone>

        </ContainerTitulo>
        <FormCard>
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
