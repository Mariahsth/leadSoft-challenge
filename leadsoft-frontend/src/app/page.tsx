import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Home() {
  return (
    <div >
      <Header/>
      <Banner/>
      <Inicio/>
      <Footer/>

    </div>
  );
}
