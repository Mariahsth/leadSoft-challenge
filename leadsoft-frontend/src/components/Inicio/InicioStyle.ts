import styled from "styled-components";
import { breakpoints } from "@/styles/breakPoints";
import { slideInStyle } from "@/styles/slideAnimation";
import { Card, ContainerColuna, ContainerHorizontal } from "@/styles/ReusableStyle";

export const ContainerInicio = styled(ContainerColuna)`
  padding: 1rem 5rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;

export const CardInicio = styled(Card)`
  @media (max-width: ${breakpoints.tablet}) {
    padding:1rem;
    margin-top:0;
  }
`

export const TituloInicio = styled(ContainerHorizontal)`
  gap: 1rem;
  font-size: 1.7em;
  padding: 1em 0;
  text-align: center;
  ${slideInStyle}

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2em;
  }
`;

export const TextoDestaque = styled.strong`
  color: var(--primary-color2);
`;

export const ConteudoInicio = styled.div`
  margin-top:2rem;
  ${slideInStyle}
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 1rem;
  }
`;


export const ConteudoTexto = styled(ContainerColuna)`
  margin: 3rem 0.5rem;
  gap: 1.5rem;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
  }
`;
