"use client"
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inscricao from "@/components/Inscricao";
import dynamic from "next/dynamic";

const Galeria = dynamic(() => import("@/components/Galeria"), { ssr: false, loading: () => <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando galeria...</p> });
const PainelAdmin = dynamic(() => import("@/components/PainelAdmin"), { ssr: false });


export default function Home() {
  return (
    <div >
      <Header/>
      <Banner/>
      <Inicio/>
      <Inscricao/>
      <Galeria/>
      <PainelAdmin/>
      <Footer/> 

    </div>
  );
}
