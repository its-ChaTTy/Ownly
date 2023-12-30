import "./HeroBrowse.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

function HeroBrowse() {

  const router = useRouter();
  const { setAddModal } = useAuth()

  return (
    <div className="HeroBrowse">
      <div className="HeroBrowse__left">
        <h1 className="HeroBrowse__left__Header">
          Unlock Possibilities, Rent with <br /> Ease, Earn Smartly!
        </h1>
        <p className="HeroBrowse__left__Para">
          Explore a world of possibilities, effortlessly share what you have,
          brand turn every lend into an opportunity to earn in your vibrant
          neighborhood.
        </p>
        <div className="HeroBrowse__left__search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for items to rent"
          />
          <p>Or</p>
          <button onClick={() => {
            router.push("/profile");
            setAddModal(true);
          }} className="HeroBrowse__left__search__btn">List an Item</button>
        </div>
        <div className="HeroBrowse__left__Button">
          <img className="HeroBrowse__left__Button--monetize" src="/Images/Home_page/monetize.webp" />
          <Link href="/productPage">
            <img className="HeroBrowse__left__Button--explore" src="/Images/Home_page/explore_prod.webp" />
          </Link>
        </div>
      </div>
      <div className="HeroBrowse__right">
        <img src="/Images/Home_page/home_page.webp" alt="Hero Browse" />
      </div>
    </div>
  );
}

export default HeroBrowse;
