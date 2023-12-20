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

export async function getServerSideProps(context) {
  let allItems = await fetchAvailableItems();
  const user = context.req.session.user;
  var userProp;
  if(user === undefined) {
    userProp = null;
  } else {
    userProp = user;
  }
  return {
    props: { allItems: allItems, user: userProp },
  };
}


export default function Home({ allItems, user }) {

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
        <Store allItems={allItems} user={user} />
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