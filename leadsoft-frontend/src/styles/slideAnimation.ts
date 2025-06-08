import styled, { keyframes, css } from "styled-components";

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;


export const slideInStyle = css`
  &.slide-in {
    opacity: 0;
    transform: translateX(-100px);
  }

  &.slide-in.visible {
    animation: ${slideInFromLeft} 0.8s ease-out forwards;
  }
  &.slide-out {
    opacity: 0;
    transform: translateX(100px);
  }

  &.slide-out.visible {
    animation: ${slideInFromRight} 0.8s ease-out forwards;
  }
`;

export const SlideInTitleH1 = styled.h1`
  ${slideInStyle}
`;

export const SlideInTitleH2 = styled.h2`
  ${slideInStyle}
`;

export const SlideInTitleH3 = styled.h3`
  ${slideInStyle}
`;
export const SlideInDiv = styled.div`
  ${slideInStyle}
`;
