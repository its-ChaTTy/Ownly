import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import HeroBrowse from "@/components/HeroBrowse/HeroBrowse";
export default function Home() {
  return (
    <>
      <div className="section">
        {/* <Navbar /> */}
        <HeroBrowse />
        <Footer />
      </div>
    </>
  );
}
