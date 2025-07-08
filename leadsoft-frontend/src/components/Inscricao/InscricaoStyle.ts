import styled from "styled-components";
import { breakpoints } from "@/styles/breakPoints";

export const ImgFoguete = styled.img`
  width: 15em;
  height: auto;
  border-bottom: 1px solid var(--secundary-color12);

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;
