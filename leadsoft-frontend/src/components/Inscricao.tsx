"use client";
import { useSlideInOnView } from "@/hooks/useSlideInOnView";
import { breakpoints } from "@/styles/breakPoints";
import { BotaoForm, ContainerBotao, ContainerTitulo, FormCard, FormSection, Formulario, Input } from "@/styles/FomularioStyle";
import styled from "styled-components";


const ImgFoguete=styled.img`
width:15em;
height:auto;
border-bottom: 1px solid var(--secundary-color12);
@media (max-width: ${breakpoints.mobile}) {
    display:none
  }
`
export default function Inscricao() {
    const slideInRef = useSlideInOnView("slide-in", { threshold: 0.1 });
    const slideInRef2 = useSlideInOnView("slide-in", { threshold: 0.1 });

  
  return (
    <FormSection id='form'>
        <ContainerTitulo ref={slideInRef} className="slide-in">
            <h2 >Grandes jornadas começam com um clique</h2>
            <h3 >Inscreva-se e transforme o amanhã</h3>
            <ImgFoguete src='/rocket3.png'alt="Foguete" />

        </ContainerTitulo>
        <FormCard ref={slideInRef2} className="slide-out">
            <Formulario>
                <h3>Cadastro</h3>

                <Input type="hidden" id="id" />
                <label htmlFor="nome">Nome completo:</label>
                <Input 
                type="text" 
                name="nome"
                id="nome" 
                placeholder="Insira seu nome completo" 
                required />
                <label htmlFor="nome">CPF:</label>
                <Input 
                type="text" 
                name="cpf"
                id="cpf" 
                placeholder="Insira seu CPF" 
                required />
                <label htmlFor="nome">E-mail:</label>
                <Input 
                type="text" 
                name="email"
                id="email" 
                placeholder="Insira seu e-mail" 
                required />
                <label htmlFor="nome">Data de nascimento:</label>
                <Input 
                type="date" 
                name="data"
                id="data" 
                placeholder="Insira sua data de nascimento:" 
                required />
                <label htmlFor="nome">Legenda:</label>
                <Input 
                type="text" 
                name="legenda"
                id="legenda" 
                placeholder="Insira uma legenda criativa:" 
                required />
                <label htmlFor="nome">Imagem:</label>
                <Input 
                type="file" 
                name="imagem"
                id="imagem" 
                placeholder="Insira uma imagem:" 
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
