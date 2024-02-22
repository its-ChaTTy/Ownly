import './ItemCard.scss'
import { useState } from 'react'
import {
    Image
} from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';
import { deleteItem } from '@/operations/items.fetch';

function ItemCard({ item }) {

    const [image, setImage] = item.imageURL.length !== 0 ? useState(item.imageURL[0]) : useState('/Images/Store/temp.webp')
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [category, setCategory] = useState(item.category)

    const { setEditItem, addModal, setAddModal } = useAuth()

    const handleDelete = async () => {

        const choice = window.confirm('Are you sure you want to delete this item?')
        if (choice) {
            const data = {
                id: item.id,
                userId: item.userId
            }

            const response = await deleteItem(data)
    
            if (response.status === 200) {
                alert('Item deleted successfully')
                window.location.reload()
            } else {
                alert('Something went wrong')
                // window.location.reload()
            }

        }

    }

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
                    <div className='ItemCard__content--button'>
                        <button className='ItemCard__content--button__button'
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemCard