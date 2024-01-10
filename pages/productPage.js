import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SortbyBar from "@/components/SortByBar/SortByBar";
import ProductPageFilter from "@/components/ProductPageFilter/ProductPageFilter";
import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";
import { useState, useEffect } from "react";
import { fetchAvailableItems } from "@/services/items.service";
import '@/styles/routes/productPage.scss'
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export async function getServerSideProps(context) {
  
  const user = context.req.session.user;
  var userProp = null;

  if (user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else {
    userProp = user;
  }

  let allItems = await fetchAvailableItems();

  return {
    props: { allItems: allItems, user: userProp },
  };
}

export default function ProductPage({ allItems, user }) {

  const [sortOrder, setSortOrder] = useState(0);
  const [itemsArray, setItems] = useState(allItems);
  const [isLoading, setIsLoading] = useState(true);

  const sortProducts = (sortOrder) => {
    setIsLoading(true);
    let sortedItems = [...itemsArray];
  
    if (sortOrder === 1) {
      sortedItems.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === 2) {
      sortedItems.sort((a, b) => Number(b.price) - Number(a.price));
    }
  
    setItems(sortedItems);
    setIsLoading(false);
  }

  useEffect(() => {
    sortProducts(sortOrder);
  }, [sortOrder, allItems]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 1 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="section_navbar">
        <Navbar />
      </div>
      <div className="section_sortByBar">
        <SortbyBar setSortOrder={setSortOrder} />
      </div>
      <div className="section_main">
        {/* <div className="section_main__filter">
          <ProductPageFilter />
        </div> */}
        <div className="section_main__cards">
          <ProductPageCards items={itemsArray} userId={user.id} />
        </div>
      </div>
      <div className="section">
        <Footer />
      </div>
    </>
  );
}