import React from "react";
import './ProductPageCards.scss';
import ItemCard from "../ItemCard/ItemCard";

function ProductPageCards() {
    const items = [
        // item with name, price,imageurl and different category
        {
            'name': 'Item 1',
            'price': '10/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'ELECTRONICS'
        },
        {
            'name': 'Item 3',
            'price': '30/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'STATIONARY'
        },
        {
            'name': 'Item 4',
            'price': '40/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'APPAREL'
        },
        {
            'name': 'Item 5',
            'price': '50/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'FITNESS'
        },
        {
            'name': 'Item 6',
            'price': '60/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'FASHION'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        {
            'name': 'Item 7',
            'price': '70/day',
            'imageurl': '/Images/Store/temp.png',
            'category': 'MUSIC'
        },
        
    ]
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
                                <p className='Product__Cards--item__text--price'>Rs. {item.price}</p>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default ProductPageCards;