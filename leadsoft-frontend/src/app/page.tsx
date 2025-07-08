'use client'
import Footer from "@/components/Footer";
import Inicio from "@/components/Inicio/Inicio";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inscricao from "@/components/Inscricao/Inscricao";
import dynamic from "next/dynamic";
import Banner from "@/components/Banner/Banner";
import HeaderClient from "@/components/Header/HeaderClient";
import Galeria from "@/components/Galeria";

const PainelAdmin = dynamic(() => import("@/components/PainelAdmin"));

export default function Home() {
  return (
    <>
      <HeaderClient />
      <Banner />
      <Inicio />
      <Inscricao />
      <Galeria />
      <PainelAdmin />
      <Footer />
    </>
  );
}
