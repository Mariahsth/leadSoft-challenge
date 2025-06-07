"use client";
import { breakpoints } from "@/styles/breakPoints";
import styled from "styled-components";

const FormSection=styled.section`
display:flex;
justify-content:center;
align-items:center;
width:100%;
padding:9rem 1rem;

text-align:center;
gap:1rem;
border: 1px solid var(--secundary-color12);

@media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;

  }

`

const ContainerTitulo=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
gap:1rem;
`
const ImgFoguete=styled.img`
width:15em;
height:auto;
border-bottom: 1px solid var(--secundary-color12);
@media (max-width: ${breakpoints.mobile}) {
    display:none
  }
`
const FormCard=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
border-radius:16px;
background: linear-gradient(
    to bottom,
    var(--primary-color1),
    var(--secundary-color12)
  );
padding:1rem 5rem;
margin:2rem 0;
box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
border: 1px solid var(--primary-color1);
@media (max-width: ${breakpoints.tablet}) {
    padding:1rem 3rem;
  }
`
const Formulario=styled.form`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:0.5rem;
`
const Input=styled.input`
padding:0.5rem;
border-radius:16px;
border:transparent;
width:100%;

background-color: white;
font-weight: 500;
color:var(--secundary-color9);
text-align:center;

&::placeholder{
    font-family: var(--font-body);
    color:var(--secundary-color9);
}
`

export default function Form() {
  return (
    <FormSection id='form'>
        <ContainerTitulo>
            <h2>Grandes jornadas começam com um clique.</h2>
            <h3>Inscreva-se e transforme o amanhã.</h3>
            <ImgFoguete src='/rocket3.png'alt="Foguete" />

        </ContainerTitulo>
        <FormCard>
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
            </Formulario>
        </FormCard>
    </FormSection>
  );
}
