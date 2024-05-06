import './ProductPageCards.scss';
import Slideshow from '@/components/SlideShow/Slideshow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
    Modal, ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import { useState } from 'react'
import DatePicker from '@/components/DatePicker/DatePicker';

function ProductPageCards({ items, userId }) {
    const [showCalender, setShowCalender] = useState(false)
    const [itemId, setItemId] = useState(items[0].id);
    const [price, setPrice] = useState(items[0].price);

    return (
        <>
            <Modal isOpen={showCalender} onClose={() => setShowCalender(false)} isCentered size={'xxl'}>
                <ModalOverlay />
                <ModalContent className="modalContent">
                    <DatePicker id={itemId} userId={userId} price={price} />
                </ModalContent>
            </Modal>
            <div className="Product__Cards">
                {items.map((item, index) => {
                    return (
                        <div className='Product__Cards--item' key={index}>
                            <div className='Product__Cards--item__overlay'>
                                <button onClick={() => {
                                    setItemId(item.id);
                                    setPrice(item.price);
                                    setShowCalender(true);
                                }} className='Product__Cards--item__overlay--button1'
                                    style={{
                                        display: item.userId === userId ? 'none' : ''
                                    }}
                                >Rent Now</button>
                            </div>
                            <div className='Product__Cards--item__image'>
                                <Slideshow imageURL={item.imageURL} />
                            </div>
                            <div className='Store__items--item__text'>
                                <p className='Store__items--item__text--name'>{item.name}</p>
                                <div className='Store__items--itemContainer'>
                                    <p className='Store__items--item__text--price'>Rs. {item.price}</p>
                                    <button onClick={() => {
                                        setItemId(item.id);
                                        setPrice(item.price);
                                        setShowCalender(true);
                                    }} className='Store__items--item__button2' style={{
                                        display: item.userId === userId ? 'none' : ''
                                    }}>
                                        {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
                                        Rent Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </>
    );
}

export default ProductPageCards;