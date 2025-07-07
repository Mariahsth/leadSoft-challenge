import styled from "styled-components";
import { breakpoints } from "@/styles/breakPoints";

export const BannerContainer = styled.section`
  width: 100%;
  height: 25rem;
  position: relative;
  margin-top: 100px;

  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slick-slide {
    height: 100%;
    div {
      height: 100%;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 50px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 15rem;
  }
`;

export const TitleOverlay = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--secundary-color9);
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  font-size: 1.5em;
  z-index: 2;
  width: 100%;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em;
    padding: 0 0.5rem;
  }
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
