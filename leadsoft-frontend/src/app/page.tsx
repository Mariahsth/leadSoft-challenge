import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import Form from "@/components/Form";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Galeria from "@/components/Galeria";


export default function Home() {
  return (
    <div >
      <Header/>
      <Banner/>
      <Inicio/>
      <Form/>
      <Galeria/>
      <Footer/>

    </div>
  );
}
