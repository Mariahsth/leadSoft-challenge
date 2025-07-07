"use client";
import Slider from "react-slick";
import Image from "next/image";
import { Slide } from "./BannerStyle";
import type { Settings } from "react-slick";

type Props = {
  images: string[];
};

export default function BannerClient({ images }: Props) {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "ondemand",
  };

  return (
    <Slider {...settings} accessibility={true}>
      {images.map((src, i) => (
        <Slide key={i}>
          <Image
            src={`/${src}`}
            alt={`Imagem de fundo ${i + 1}`}
            fill
            priority={i === 0}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 55%" }}
          />
        </Slide>
      ))}
    </Slider>
  );
}
