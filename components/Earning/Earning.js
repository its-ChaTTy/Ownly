import React from 'react'
import './Earning.scss'

const Earning = () => {
    return (
        <div className='Earning'>
            <div className='Earning__left'>
                <div className='Earning__left--content'>
                    <p className='Earning__left--content__text1'>Ready to start earning</p>
                    <p className='Earning__left--content__text2'>Start earning on OWNLY</p>
                    <p className='Earning__left--content__text3'>Make money lending your belongings to people in your area</p>
                    <button className='Earning__left--content__button'>List an Item</button>
                </div>
                <img src='/Images/Assets/earning_block.png' />
            </div>
            <div className='Earning__right'>
                <img src='/Images/Assets/earning.png' />
            </div>
        </div>
    )
}

export default Earning