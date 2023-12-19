import "./HeroBrowse.scss";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon from React Icons
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

function HeroBrowse({ user }) {
  const router = useRouter();
  const {addModal , setAddModal} = useAuth()
  const handleListItem = () => {
    router.push("/auth/register");
  };

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
            if(user === null) {
              router.push('/auth/login')
            } else {
              setAddModal(!addModal)
            }
          }} className="HeroBrowse__left__search__btn">List an Item</button>
        </div>
        <div className="HeroBrowse__left__Button">
          <img className="HeroBrowse__left__Button--monetize" src="/Images/Home_page/monetize.png" />
          <Link href="/productPage">
            <img className="HeroBrowse__left__Button--explore" src="/Images/Home_page/explore_prod.png" />
          </Link>
        </div>
      </div>
      <div className="HeroBrowse__right">
        <img src="/Images/Home_page/home_page.png" alt="Hero Browse" />
      </div>
    </div>
  );
}

export default HeroBrowse;
