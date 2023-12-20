import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SortbyBar from "@/components/SortByBar/SortByBar";
import ProductPageFilter from "@/components/ProductPageFilter/ProductPageFilter";
import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";
import { useState, useEffect } from "react";
import { fetchAvailableItems } from "@/services/items.service";
import '@/styles/routes/productPage.scss'

export async function getServerSideProps(context) {
  let allItems = await fetchAvailableItems();
  const user = context.req.session.user;
  var userProp;
  if (user === undefined) {
    userProp = null;
  } else {
    userProp = user;
  }
  return {
    props: { allItems: allItems, user: userProp },
  };
}

export default function ProductPage({ allItems, user }) {

  const [sortOrder, setSortOrder] = useState(0);
  const [itemsArray, setItems] = useState(allItems);

  const sortProducts = (sortOrder) => {
    // 0 = default, 1 = low to high, 2 = high to low
    // but idk why its displaying in reverse order
    // so for now i'm just changing 1 to 2 // we'll fix it later
  
    // need to test
    if (sortOrder === 2) {
      allItems.sort((a, b) => {
        return a.price - b.price;
      })
    } else {
      allItems.sort((a, b) => {
        return b.price - a.price;
      })
    }
  }

  useEffect(() => {
    sortProducts(sortOrder);
    setItems(allItems);
  }, [sortOrder])


  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>
      <div className="section_sortByBar">
        <SortbyBar setSortOrder={setSortOrder} />
      </div>
      <div className="section_main">
        <div className="section_main__filter">
          <ProductPageFilter />
        </div>
        <div className="section_main__cards">
          <ProductPageCards items={itemsArray} />
        </div>
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}