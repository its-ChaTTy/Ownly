import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
import About from "@/components/About/About";
import Store from "@/components/Store/Store";
import How from "@/components/How/How";
import Earning from "@/components/Earning/Earning";
import How_it_works from "@/components/How_it_works/How_it_works";
import "@/styles/routes/index.scss";
import { fetchAvailableItems } from "@/services/items.service";
import Cart from "@/components/Cart/Cart";
export async function getServerSideProps(context) {
  let allItems = await fetchAvailableItems();
  return {
    props: { allItems: allItems },
  };
}

export default function Home({ allItems }) {
  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>
      <div id="heroBrowse" className="section">
        <HeroBrowse />
      </div>
      <div id="about" className="section">
        <About />
      </div>
      <div id="store" className="section">
        <Store allItems={allItems} />
      </div>
      <div id="how" className="section">
        <How />
      </div>
      <div id="earning" className="section">
        <Earning />
      </div>
      <div id="howItWorks" className="section">
        <How_it_works />
      </div>
      <div id="footer" className="section">
        <Footer />
      </div>
    </>
  );
}
