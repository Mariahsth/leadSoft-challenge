"use client";
import styled from "styled-components";
import Slider from "react-slick";
import { breakpoints } from "@/styles/breakPoints";
import { useMemo } from "react";
import type { Settings } from "react-slick";

const BannerContainer = styled.section`
  width: 100%;
  height: 25rem;
  position: relative;
  margin-top:100px;

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
    margin-top:50px;

  
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: 15rem;
  
  }
`;

const TitleOverlay = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--secundary-color9);
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  font-size: 1.5em;
  z-index: 2;
  width:100%;
  text-align:center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8em;
    padding:0 0.5rem;
  
  }
`;

const Slide = styled.div<{ $bg: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ $bg }) => `/${$bg}`});
  background-size: cover;
  background-position: 50% 55%;

`;

export default function Banner() {
  const images = ["mars.webp", "eclipse.webp", "galaxy2.webp", "telescope.webp", "mars4.webp"];

  const settings: Settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "ondemand",
  }), []);

  return (
    <BannerContainer>
      <Slider {...settings} accessibility={true} >
        {images.map((src, i) => (
          <Slide key={i} $bg={src} role="img" aria-label={`Imagem de fundo ${i + 1}`}/>
        ))}
      </Slider>
      <TitleOverlay id='home' role="heading" aria-level={2}>Potencializando decisões com inteligência além da Terra</TitleOverlay>
    </BannerContainer> 
  );
}
