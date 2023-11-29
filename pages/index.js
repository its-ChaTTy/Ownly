import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
import About from "@/components/About/About";
import Store from "@/components/Store/Store";
import '../styles/routes/index.scss'

export default function Home() {
  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>
      <div className="section">
        <HeroBrowse />
      </div>
      <div className="section">
        <About />
      </div>
      <div className="section">
        <Store />
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}
