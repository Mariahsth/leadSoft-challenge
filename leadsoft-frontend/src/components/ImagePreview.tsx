import { ContainerColuna } from "@/styles/ReusableStyle";
import styled from "styled-components";

const ImgPreview = styled.img`
  width: 15em;
  max-width: 100%;
  border: 2px solid var(--secundary-color9);
  background-color:transparent;
  border-radius: 8px;
  display: block;
  margin-bottom: 6px;
`;

interface ImagePreviewProps {
  src: string;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <ContainerColuna style={{ marginTop: 10 }}>
      <ImgPreview src={src} alt="Prévia da imagem redimensionada" loading="lazy"/>
      <small style={{ color: "var(--secundary-color11)", fontSize: "0.85rem" }}>
        A imagem será ajustada para 1080x1080px, sem distorções.
      </small>
    </ContainerColuna>
  );
}