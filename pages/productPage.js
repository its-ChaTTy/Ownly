import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import '../styles/routes/productPage.scss'
import SortbyBar from "@/components/SortByBar/SortByBar";
import ProductPageFilter from "@/components/ProductPageFilter/ProductPageFilter";
import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";

export default function ProductPage() {
  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>
      <div className="section_sortByBar">
        <SortbyBar />
      </div>
      <div className="section_main">
        <div className="section_main__filter">
          <ProductPageFilter />
        </div>
        <div className="section_main__cards">
          <ProductPageCards />
        </div>
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}
