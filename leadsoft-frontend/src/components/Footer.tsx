"use client";
import { breakpoints } from "@/styles/breakPoints";
import { ContainerColuna, ContainerHorizontal } from "@/styles/ReusableStyle";
import styled from "styled-components";

const FooterStyle = styled.footer`
  border-top: 1px solid var(--secundary-color12);
  box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.25);
`;
const ContainerFooter = styled(ContainerHorizontal)`
  padding: 1rem 5rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const TextFooter = styled.p`
  color: var(--secundary-color1);
  font-size: 0.8em;
  text-align: center;
`;
const ContainerLambdaText = styled(ContainerHorizontal)`
  gap: 0.2rem;
`;
const LambdaImg = styled.img`
  width: 0.5em;
`;

export default function Footer() {
  return (
    <FooterStyle>
      <ContainerFooter>
        <ContainerColuna style={{ gap: "0.5rem" }}>
          <ContainerLambdaText>
            <LambdaImg src="/lambda-leadsoft-2023.svg" alt="Lambda" />
            <TextFooter>LeadSoft</TextFooter>
          </ContainerLambdaText>
          <TextFooter>
            LeadSoft® Soluções Web | © 2018 - 2025 Copyright
          </TextFooter>
        </ContainerColuna>
      </ContainerFooter>
    </FooterStyle>
  );
}
