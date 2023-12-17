import React from "react";
import './ProductPageCards.scss';

function ProductPageCards({ items }) {
    
    return (
        <div className="Product__Cards">
            {items.map((item, index) => {
                return (
                    // Add a on hover view which displays 2 buttons over the card
                    <div className='Product__Cards--item' key={index}>
                        <div className='Product__Cards--item__overlay'>
                            <button className='Product__Cards--item__overlay--button1'>Buy Now</button>
                            <button className='Product__Cards--item__overlay--button2'>Add to Cart</button>
                        </div>
                        <div className='Product__Cards--item__image'>
                            <img src={item.imageurl} alt='item' />
                        </div>
                        <div className='Product__Cards--item__text'>
                            <p className='Product__Cards--item__text--name'>{item.name}</p>
                            <p className='Product__Cards--item__text--price'>Rs. {item.price}/Day</p>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    );
}

export default ProductPageCards;