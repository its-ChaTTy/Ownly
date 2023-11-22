import "./HeroBrowse.scss";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon from React Icons
import React from "react";

function HeroBrowse() {
  return (
    <div className="HeroBrowse">
      <h1 className="HeroBrowse__Header">
        Unlock Possibilities, Rent with <br /> Ease, Earn Smartly!
      </h1>
      <p className="HeroBrowse__Para">
        Explore a world of possibilities, effortlessly share what you have,
        brand turn every lend into an opportunity to earn in your vibrant
        neighborhood.
      </p>
      <div className="HeroBrowse__Button">
        <button className="HeroBrowse__BrowseBtn">
          Browse an Item &nbsp; <FaArrowRight />
        </button>
        <button className="HeroBrowse__ListBtn">
          List an Item &nbsp; <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default HeroBrowse;
