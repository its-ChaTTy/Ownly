import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import SortbyBar from "@/components/SortByBar/SortByBar";
import ProductPageFilter from "@/components/ProductPageFilter/ProductPageFilter";
import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";
import { useState, useEffect } from "react";
import '@/styles/routes/productPage.scss'

export default function ProductPage() {

  const items = [
    {
      'name': 'Item 1',
      'price': 10,
      'imageurl': '/Images/Store/temp.png',
      'category': 'ELECTRONICS'
    },
    {
      'name': 'Item 3',
      'price': 30,
      'imageurl': '/Images/Store/temp.png',
      'category': 'STATIONARY'
    },
    {
      'name': 'Item 4',
      'price': 40,
      'imageurl': '/Images/Store/temp.png',
      'category': 'APPAREL'
    },
    {
      'name': 'Item 5',
      'price': 50,
      'imageurl': '/Images/Store/temp.png',
      'category': 'FITNESS'
    },
    {
      'name': 'Item 6',
      'price': 60,
      'imageurl': '/Images/Store/temp.png',
      'category': 'FASHION'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
    {
      'name': 'Item 7',
      'price': 70,
      'imageurl': '/Images/Store/temp.png',
      'category': 'MUSIC'
    },
  ]


  const [sortOrder, setSortOrder] = useState(0);
  const [itemsArray, setItems] = useState(items);

  const sortProducts = (sortOrder) => {
    if (sortOrder === 1) {
      items.sort((a, b) => {
        return a.price - b.price;
      })
    } else {
      items.sort((a, b) => {
        return b.price - a.price;
      })
    }
  }

  useEffect(() => {
    sortProducts(sortOrder);
    setItems(items);
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