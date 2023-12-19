import React, { useState } from 'react'
import './Store.scss'
import Slideshow from '../SlideShow/Slideshow'
import { useRouter } from 'next/router'

const Store = ({ allItems, user }) => {
    const router = useRouter();
    const pills = ['ALL', 'ELECTRONICS', 'STATIONARY', 'APPAREL', 'FITNESS', 'FASHION']
    const [selectedPill, setSelectedPill] = useState('ALL')

    const first10Items = allItems.slice(0, 10);

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
            <div className='Store__items'>
                {first10Items.map((item, index) => {
                    if (item.category === selectedPill || selectedPill === 'ALL') {
                        return (
                            // Add a on hover view which displays 2 buttons over the card
                            <div className='Store__items--item' key={index}>
                                <div className='Store__items--item__overlay'>
                                    <button className='Store__items--item__overlay--button1'>Buy Now</button>
                                    <button className='Store__items--item__overlay--button2'>Add to Cart</button>
                                </div>
                                <div className='Store__items--item__image'>
                                    {/* <img src={item.imageURL[0]} alt='item' /> */}
                                    <Slideshow imageURL={item.imageURL} />
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
            <div className='Store__button'>
                <button onClick={() => {
                    if (user === null) {
                        router.push('/login')
                    } else {
                        router.push('/productPage')
                    }
                }}>Load More</button>
            </div>
        </div>
    )
}

export default Store