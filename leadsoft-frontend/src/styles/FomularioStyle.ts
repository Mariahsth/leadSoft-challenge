"use client";
import { breakpoints } from "@/styles/breakPoints";
import styled from "styled-components";
import { slideInStyle } from "./slideAnimation";

export const FormSection=styled.section`
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
export const ContainerTitulo=styled.div`
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
gap:1rem;
${slideInStyle};

`
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: linear-gradient(
    to bottom,
    var(--primary-color1),
    var(--secundary-color12)
  );
  padding: 1rem 5rem;
  margin: 2rem 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--primary-color1);
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem 3rem;
  }
  ${slideInStyle}
`;
export const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export const Input = styled.input`
  padding: 0.5rem;
  border-radius: 16px;
  border: transparent;
  width: 100%;

  background-color: white;
  font-weight: 500;
  color: var(--secundary-color9);
  text-align: center;

  &::placeholder {
    font-family: var(--font-body);
    color: var(--secundary-color9);
  }
`;

export const Botao = styled.button`
padding: 0.5rem 1rem;
width: 50%;
border-radius: 8px;
color: var(--secundary-color12);
font-weight: 800;
cursor: pointer;
border: none;
background: linear-gradient(
  to bottom,
  var(--secundary-color9),
  var(--secundary-color10)
  );
  display: flex;
  align-items: center;
  gap: 0.2rem;
  justify-content: center;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  margin-top:1rem;
  
  &:hover{
    background: linear-gradient(
      to bottom,
      var(--secundary-color5),
      var(--secundary-color6)
      );
      color: var(--secundary-color8);
      
    }
    
    `;

export const ContainerBotao = styled.div`

display: flex;
align-items: center;
gap: 0.8rem;
justify-content: center;

`;


