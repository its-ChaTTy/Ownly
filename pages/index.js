import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
import About from "@/components/About/About";
import Store from "@/components/Store/Store";
import How from "@/components/How/How";
import Earning from "@/components/Earning/Earning";
import How_it_works from "@/components/How_it_works/How_it_works";
import { fetchAvailableItems } from "@/services/items.service";
import "@/styles/routes/index.scss";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { fetchMessagesOfUser } from '@/services/messages.service';

export async function getServerSideProps(context) {
  let allItems = await fetchAvailableItems();
  const user = context.req.session.user;
  var userProp;
  const messages = await fetchMessagesOfUser(user);

  if(user === undefined) {
    userProp = null;
  } else {
    userProp = user;
  }
  return {
    props: { allItems: allItems, user: userProp, messages: messages ? messages.message : [], },
  };
}


export default function Home({ allItems, user, messages }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 2 seconds

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="section_navbar">
        <Navbar user={user} messages={messages} />
      </div>
      <div id="heroBrowse" className="section">
        <HeroBrowse />
      </div>
      <div id="about" className="section">
        <About />
      </div>
      <div id="store" className="section">
        <Store allItems={allItems} user={user} />
      </div>
      <div id="how" className="section">
        <How />
      </div>
      <div id="earning" className="section">
        <Earning />
      </div>
      {/* <div id="howItWorks" className="section">
        <How_it_works />
      </div> */}
      <div id="footer" className="section">
        <Footer />
      </div>
    </>
  );
}