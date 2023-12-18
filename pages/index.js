import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
import About from "@/components/About/About";
import Store from "@/components/Store/Store";
import How from "@/components/How/How";
import Earning from "@/components/Earning/Earning";
import How_it_works from "@/components/How_it_works/How_it_works";
import '@/styles/routes/index.scss'
import { fetchAvailableItems } from "@/services/items.service";

export async function getServerSideProps(context) {
  let allItems = await fetchAvailableItems();
  return {
    props: { allItems: allItems, },
  };
}

export default function Home({allItems}) {
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
        <Store allItems={allItems} />
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
