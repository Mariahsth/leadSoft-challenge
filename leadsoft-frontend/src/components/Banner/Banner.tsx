import BannerClient from "./BannerClient";
import { BannerContainer, TitleOverlay } from "./BannerStyle";

export default function Banner() {
  const images = [
    "mars.webp",
    "eclipse.webp",
    "galaxy2.webp",
    "telescope.webp",
    "mars4.webp",
  ];

  return (
    <BannerContainer>
      <BannerClient images={images} />
      <TitleOverlay id="home" role="heading" aria-level={2}>
        Potencializando decisões com inteligência além da Terra
      </TitleOverlay>
    </BannerContainer>
  );
}
