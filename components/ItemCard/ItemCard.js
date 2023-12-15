import React from 'react'
import './ItemCard.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Modal, ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import ListItem from '@/components/ListItem/ListItem';
function ItemCard({ item }) {

    const [image, setImage] = useState(item.imageURL)
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [category, setCategory] = useState(item.category)
    const [updateModal, showUpdateModal] = useState(false)
    return (
        <>
            <Modal isOpen={updateModal} onClose={() => showUpdateModal(!updateModal)} size='xxl'>
                <ModalOverlay />
                <ModalContent>
                    <ListItem />
                </ModalContent>
            </Modal>
            <div className='ItemCard'>
                <div className='ItemCard__image'>
                    <Image src={image} height={200} width={200} alt='image' />
                </div>
                <div className='ItemCard__content'>
                    <div className='ItemCard__content--text'>
                        <p className='ItemCard__content--text__category'>{category}</p>
                        <p className='ItemCard__content--text__name'>{name}</p>
                        <p className='ItemCard__content--text__price'>INR {price}/day</p>
                    </div>
                    <div className='ItemCard__content--button'>
                        <button onClick={() => showUpdateModal(!updateModal)} className='ItemCard__content--button__button'>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard