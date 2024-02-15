import "./HeroBrowse.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function HeroBrowse() {

  const router = useRouter();
  const { setAddModal } = useAuth();

  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    router.push(`/productPage?search=${search}`);
  };



  return (
    <div className="HeroBrowse">
      <div className="HeroBrowse__left">
        <h1 className="HeroBrowse__left__Header">
          Unlock Possibilities, Rent with <br /> Ease, Earn Smartly!
        </h1>
        <p className="HeroBrowse__left__Para">
          Explore a world of possibilities, effortlessly share what you have,
          and turn every lend into an opportunity to earn in your vibrant
          neighborhood.
        </p>
        <div className="HeroBrowse__left__search">
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search for items to rent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingRight: '30px' }} // make room for the icon
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                cursor: 'pointer',
                position: 'absolute',
                right: '25px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
              onClick={handleSearch}
            />
          </div>
          <p>Or</p>
          <button onClick={() => {
            router.push("/profile");
            setAddModal(true);
          }} className="HeroBrowse__left__search__btn">List an Item</button>
        </div>
        {/* <div className="HeroBrowse__left__Button">
          <img className="HeroBrowse__left__Button--monetize" src="/Images/Home_page/monetize.webp" />
          <Link href="/productPage">
            <img className="HeroBrowse__left__Button--explore" src="/Images/Home_page/explore_prod.webp" />
          </Link>
        </div> */}
      </div>
      <div className="HeroBrowse__right">
        <img src="/Images/Home_page/home_page.png" alt="Hero Browse" />
      </div>
    </div>
  );
}

export default HeroBrowse;
