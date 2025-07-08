import styled from "styled-components";
import { breakpoints } from "@/styles/breakPoints";
import { slideInStyle } from "@/styles/slideAnimation";
import { ContainerColuna, ContainerHorizontal } from "@/styles/ReusableStyle";

export const ContainerInicio = styled(ContainerColuna)`
  padding: 1rem 5rem;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`;

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
  display: flex;
  border: 1px solid var(--secundary-color12);
  border-radius: 16px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  ${slideInStyle}

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const ImgLeadIA = styled.img`
  width: 15rem;
  height: auto;
`;

export const LegendaLeadIA = styled.p`
  border: 1px solid var(--secundary-color12);
  border-radius: 0 0 0 16px;
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    var(--primary-color1),
    var(--secundary-color12)
  );

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 0;
  }
`;

export const ContainerImgInicio = styled(ContainerColuna)`
  width: 50%;
  border-right: 1px solid var(--secundary-color12);
  background-image: url("/space.webp");
  background-size: cover;
  background-position: center;
  border-radius: 16px 0 0 16px;
  opacity: 1;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    border-radius: 16px 16px 0 0;
  }
`;

export const ContainerTextoInicio = styled(ContainerColuna)`
  justify-content: space-between;
  width: 80%;
  position: relative;
  text-align: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/astronaut.webp");
    background-size: cover;
    background-position: 50% 50%;
    opacity: 0.2;
    z-index: 0;
    border-radius: 0 16px 16px 0;
    overflow: hidden;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  & > h2 {
    margin-top: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    border-radius: 0 0 16px 16px;
  }
`;

export const ConteudoTexto = styled(ContainerColuna)`
  margin: 3rem 0.5rem;
  gap: 0.7rem;
  text-align: center;
`;
