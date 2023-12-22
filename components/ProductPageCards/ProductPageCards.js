import './ProductPageCards.scss';
import Slideshow from '@/components/SlideShow/Slideshow';
import {
    Modal, ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker';
function ProductPageCards({ items }) {
    const [showCalender, setShowCalender] = useState(false)

    return (
        <>
            <Modal isOpen={showCalender} onClose={() => setShowCalender(false)} isCentered size={'xxl'}>
                <ModalOverlay />
                <ModalContent h={'65%'} width={'60%'} >
                    <DatePicker />
                </ModalContent>
            </Modal>
            <div className="Product__Cards">
                {items.map((item, index) => {
                    return (
                        // Add a on hover view which displays 2 buttons over the card
                        <div className='Product__Cards--item' key={index}>
                            <div className='Product__Cards--item__overlay'>
                                <button onClick={() => setShowCalender(true)} className='Product__Cards--item__overlay--button1'>Buy Now</button>
                            </div>
                            <div className='Product__Cards--item__image'>
                                <Slideshow imageURL={item.imageURL} />
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
        </>
    );
}

export default ProductPageCards;