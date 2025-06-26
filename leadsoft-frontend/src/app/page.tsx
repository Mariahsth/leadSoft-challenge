"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inscricao from "@/components/Inscricao";
import dynamic from "next/dynamic";
import Banner from "@/components/Banner";

const Galeria = dynamic(() => import("@/components/Galeria"), {  loading: () => <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando galeria...</p> });
const PainelAdmin = dynamic(() => import("@/components/PainelAdmin"));


export default function Home() {
  return (
    < >
      <Header/>
      <Banner/>
      <Inicio/>
      <Inscricao/>
      <Galeria/>
      <PainelAdmin/>
      <Footer/> 

    </>
  );
}
