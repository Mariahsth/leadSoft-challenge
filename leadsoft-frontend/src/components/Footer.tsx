"use client";
import styled from "styled-components";

const FooterStyle = styled.footer`
  border-top: 1px solid var(--secundary-color12);
  box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.25);

`;
const ContainerFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
`;
const ContainerTextFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;
const TextFooter = styled.p`
  color: var(--secundary-color1);
  font-size: 0.8em;
`;
const ContainerLambdaText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
const LambdaImg = styled.img`
  width: 0.5em;
`;

export default function Footer() {
  return (
    <FooterStyle>
      <ContainerFooter>
        <ContainerTextFooter>
          <ContainerLambdaText>
            <LambdaImg src="/lambda-leadsoft-2023.svg" alt="Lambda" />
            <TextFooter>LeadSoft</TextFooter>
          </ContainerLambdaText>
          <TextFooter>
            LeadSoft® Soluções Web | © 2018 - 2025 Copyright
          </TextFooter>
        </ContainerTextFooter>
      </ContainerFooter>
    </FooterStyle>
  );
}
