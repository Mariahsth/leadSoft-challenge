"use client";
import { breakpoints } from "@/styles/breakPoints";
import { ItemGaleriaProps } from "@/types/ItemGaleriaTypes";
import styled from "styled-components";
import { FaComment } from "react-icons/fa";

const ItemGaleriaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid var(--secundary-color12);
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    var(--primary-color1),
    var(--secundary-color12)
  );
  border-radius: 16px;
  gap: 0.5rem;
`;
const ImagemItemGaleria = styled.img`
  width: 90%;
  height: auto;
`;
const NomeItemGaleria = styled.h5`
  font-size: 1em;
`;
const ContainerBotao = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;

@media (max-width: ${breakpoints.mobile}) {
    justify-content:end;

  }
`;
const BotaoComentar = styled.button`
  padding: 0.5rem 1rem;
  width: 50%;
  border-radius: 8px;
  color: var(--secundary-color12);
  font-weight: 800;
  cursor: pointer;
  border: none;
  background: linear-gradient(
    to bottom,
    var(--secundary-color6),
    var(--secundary-color8)
  );
  display: flex;
  align-items: center;
  gap: 0.2rem;
  justify-content: center;

  @media (max-width: ${breakpoints.tablet}) {
    width: 75%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    background: transparent;
    padding: 0;
    width: auto; 
    justify-content: flex-end;
    padding-right: 1rem;
  }
`;
const TextoBotao = styled.span`
    color:var(--secundary-color12);

  @media (max-width: ${breakpoints.tablet}) {
    font-size:0.8em;
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;
const IconeComentario = styled(FaComment)`
  color: var(--secundary-color8);
  font-size: 1em;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5em; 
    color: var(--secundary-color7);
  }
`;

export default function ItemGaleria({
  nome,
  imagem,
  legenda,
}: ItemGaleriaProps) {
  return (
    <ItemGaleriaContainer>
      <NomeItemGaleria>{nome}</NomeItemGaleria>
      <ImagemItemGaleria src={imagem} alt={`imagem de ${nome}`} />
      <p>"{legenda}"</p>
      <ContainerBotao>
        <BotaoComentar>
            <TextoBotao>Comentar</TextoBotao>
            <IconeComentario  />
        </BotaoComentar>

      </ContainerBotao>
    </ItemGaleriaContainer>
  );
}
