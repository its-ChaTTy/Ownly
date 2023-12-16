import React from "react";
import './ProductPageFilter.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function ProductPageFilter() {
    return (
        <div className="PPfilter">
            <div className="PPfilter__category">
                <p>
                    <span>GENDER</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>KIDS</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>SHOP BY PRICE</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>COLOUR</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>SPORTS</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>BRAND</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>ICON</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
            <div className="PPfilter__border"></div>
            <div className="PPfilter__category">
                <p>
                    <span>BEST FOR</span>
                    <span className="PPfilter__category__icon"> <FontAwesomeIcon icon={faChevronDown} size="xs" /> </span>
                </p>
            </div>
        </div>
    );
};

export default ProductPageFilter;