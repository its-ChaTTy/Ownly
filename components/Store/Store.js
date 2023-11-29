import React, { useState } from 'react'
import './Store.scss'

const Store = () => {
    const pills = ['ALL', 'ELECTRONICS', 'STATIONARY', 'APPAREL', 'FITNESS', 'FASHION']
    const [selectedPill, setSelectedPill] = useState('ALL')
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
    ]
    return (
        <div className='Store'>
            <div className='Store__header'>
                <p className='Store__header--text1'>What sets us apart</p>
                <p className='Store__header--text2'>What's in store for you</p>
                <p className='Store__header--text3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
            </div>
            <div className='Store__pills'>
                {pills.map((pill, index) => (
                    <div style={{ backgroundColor: `${selectedPill == pill ? "black" : "white"}`, border: `${selectedPill == pill ? "1px solid white" : "1px solid black"}` }} className='Store__pills--pill' key={index}>
                        <p onClick={() => setSelectedPill(pill)} style={{ color: `${selectedPill == pill ? "white" : "black"}` }} className='Store__pills--pill__text'>{pill}</p>
                    </div>
                ))}
            </div>
            {/* filter items wrt to pill, if pill === 'ALL' then show al items */}
            <div className='Store__items'>
                {items.map((item, index) => {
                    if (item.category === selectedPill || selectedPill === 'ALL') {
                        return (
                            // Add a on hover view which displays 2 buttons over the card
                            <div className='Store__items--item' key={index}>
                                <div className='Store__items--item__overlay'>
                                    <button className='Store__items--item__overlay--button1'>Buy Now</button>
                                    <button className='Store__items--item__overlay--button2'>Add to Cart</button>
                                </div>
                                <div className='Store__items--item__image'>
                                    <img src={item.imageurl} alt='item' />
                                </div>
                                <div className='Store__items--item__text'>
                                    <p className='Store__items--item__text--name'>{item.name}</p>
                                    <p className='Store__items--item__text--price'>Rs. {item.price}</p>
                                </div>
                            </div>
                        )
                    }

                }
                )}
            </div>
        </div>
    )
}

export default Store