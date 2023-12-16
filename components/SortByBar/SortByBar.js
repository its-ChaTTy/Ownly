import React from 'react';
import './SortByBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function SortbyBar() {

 // Add code to sort products based on sortOrder here

 return (
    <div className="SortByBar">
        <div className='SortByBar__new'>
            <p>New (584)</p>
        </div>
      <div className="SortByBar__sort">
        <label htmlFor="sort-order">Sort By</label>
        <FontAwesomeIcon icon={faChevronDown} size="xs" />
      </div>
    </div>
 );
};

export default SortbyBar;