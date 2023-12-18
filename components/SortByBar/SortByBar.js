import React from 'react';
import './SortByBar.scss';
import { useState, useEffect } from 'react';

function SortbyBar({setSortOrder}) {

  // Add code to sort products based on sortOrder here

  const [order, setOrder] = useState('default');

  return (

    <div className="SortByBar">
      <div className='SortByBar__new'>
        <p>New (584)</p>
      </div>
      <div className="SortByBar__sort">
        <label htmlFor="sort-order">Sort By Price</label>
        {/* <FontAwesomeIcon icon={faChevronDown} size="xs" /> */}
        <select name="Sort By" id="sort-order" style={{
          height: '30px',
          padding: '0px 10px',
        }}>
          <option hidden value="default">Select</option>
          <option value="1" onClick={() => setSortOrder(1)}>Low to High</option>
          <option value="2" onClick={() => setSortOrder(2)}>High to Low</option>
        </select>
      </div>
    </div>

  );
};

export default SortbyBar;