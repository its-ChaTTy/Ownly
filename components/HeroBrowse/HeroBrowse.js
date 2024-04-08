import "./HeroBrowse.scss";
import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import RequestItem from "../RequestItem/RequestItem";

function HeroBrowse() {

  const router = useRouter();
  const { setAddModal } = useAuth();

  const [search, setSearch] = useState("");
  const [isRequestItemOpen, setIsRequestItemOpen] = useState(false);

  const handleSearch = async () => {
    router.push(`/productPage?search=${search}`);
  };

  const handleOpenRequestItem = () => {
		setIsRequestItemOpen(true);
	};

	const handleCloseRequestItem = () => {
		setIsRequestItemOpen(false);
	};

  return (
    <div className="HeroBrowse">
      <div className="HeroBrowse__right">
        <img src="/Images/Home_page/home_page.png" alt="Hero Browse" />
      </div>
      <div className="HeroBrowse__left">
        <h1 className="HeroBrowse__left__Header">
          RENT WHAT YOU NEED, <br /> SHARE WHAT YOU HAVE!
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
          <div className="HeroBrowse__left__search__btn">
            <button onClick={() => {
              router.push("/profile");
              setAddModal(true);
            }} className="HeroBrowse__left__search__btn--btn1">List an Item</button>
            <button onClick={handleOpenRequestItem} className="HeroBrowse__left__search__btn--btn2">Request an Item</button>
          </div>
        </div>
      </div>
      {isRequestItemOpen && <RequestItem isOpen={isRequestItemOpen} onRequestClose={handleCloseRequestItem} />}
    </div>
  );
}

export default HeroBrowse;
