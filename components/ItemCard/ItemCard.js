import './ItemCard.scss'
import { useState } from 'react'
import {
    Image
} from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';

function ItemCard({ item }) {

    const [image, setImage] = item.imageURL.length !== 0 ? useState(item.imageURL[0]) : useState('/Images/Store/temp.webp')
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [category, setCategory] = useState(item.category)
    
    const { setEditItem, addModal, setAddModal } = useAuth()

    return (
        <>
            <div className='ItemCard'>
                <div className='ItemCard__image'>
                    <Image src={image} height={200} width={200} alt='image' {...(item && { defaultValue: item.imageURL[0] })} />
                </div>
                <div className='ItemCard__content'>
                    <div className='ItemCard__content--text'>
                        <p className='ItemCard__content--text__category'>{category}</p>
                        <p className='ItemCard__content--text__name'>{name}</p>
                        <p className='ItemCard__content--text__price'>INR {price}/day</p>
                    </div>
                    <div className='ItemCard__content--button'>
                        <button onClick={() => { setEditItem(item); setAddModal(!addModal) }}
                        className='ItemCard__content--button__button'>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard