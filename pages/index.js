import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
import About from "@/components/About/About";
import Store from "@/components/Store/Store";
import "../styles/routes/index.scss";
import How from "@/components/How/How";
import Earning from "@/components/Earning/Earning";
import How_it_works from "@/components/How_it_works/How_it_works";
import Cart from "@/components/Cart/Cart";
export default function Home() {
  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>

      
      <div className="section">
        <About />
      </div>
      <div className="section">
        <Store />
      </div>
      <div className="section">
        <How />
      </div>
      <div className="section">
        <Earning />
      </div>
      <div className="section">
        <How_it_works />
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}
