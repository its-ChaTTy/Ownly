import React from 'react'
import './RentalHistory.scss'
import Image from 'next/image'
const RentalHistory = ({ item }) => {
    return (
        <div className='RentalHistory'>
            <div className='RentalHistory__top'>
                <div className='RentalHistory__top--placed'>
                    <p className='RentalHistory__top--placed__text'>Order Placed</p>
                    <p className='RentalHistory__top--placed__value'>{item.order_placed}</p>
                </div>
                <div className='RentalHistory__top--total'>
                    <p className='RentalHistory__top--total__text'>Total</p>
                    <p className='RentalHistory__top--total__value'>{item.total}</p>
                </div>
                <div className='RentalHistory__top--duration'>
                    <p className='RentalHistory__top--duration__text'>Duration</p>
                    <p className='RentalHistory__top--duration__value'>{item.duration}</p>
                </div>
                <div className='RentalHistory__top--orderid'>
                    <p className='RentalHistory__top--orderid__text'>Order ID</p>
                    <p className='RentalHistory__top--orderid__value'>{item.id}</p>
                </div>
            </div>
            <div className='RentalHistory__bottom'>
                <div className='RentalHistory__bottom--delivered'>Delivered On {item.delivered_date}</div>
                <div className='RentalHistory__bottom--details'>
                    <Image width={140} height={140} src={item.item_image} />
                    <div className='RentalHistory__bottom--details__content'>
                        <p className='RentalHistory__bottom--details__content--item_name'>{item.item_name}</p>
                        <p className='RentalHistory__bottom--details__content--item_desc'>{item.item_desc}</p>
                        <div className='RentalHistory__bottom--details__content--buttons'>
                            <button className='RentalHistory__bottom--details__content--buttons__again'>Rent it again</button>
                            <button className='RentalHistory__bottom--details__content--buttons__view'>View your item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentalHistory