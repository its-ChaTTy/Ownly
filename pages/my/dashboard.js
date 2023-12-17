import ItemCard from '@/components/ItemCard/ItemCard'
import '@/styles/routes/dashboard.scss'
import { useEffect, useState } from 'react'
import { RiHome6Line } from "react-icons/ri";
import { FaCompass } from "react-icons/fa";
import { Md1KPlus, MdInsertChartOutlined } from "react-icons/md";
import Navbar from '@/components/Navbar/Navbar';
import {
    Modal, ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import ListItem from '@/components/ListItem/ListItem';
import PaymentConfirmationCard from '@/components/PaymentConfirmationCard/PaymentConfirmationCard';
import RentalHistory from '@/components/RentalHistory/RentalHistory';

export default function listingDashboard() {

    const [page, setPage] = useState('profile')
    const [updateModal, showUpdateModal] = useState(false)
    const [paymentModal, showPaymentModal] = useState(true)
    const [user, setUser] = useState({
        name: "name",
        email: "email",
        phone: "phone",
        address: "address",
        imageURL: "/Images/Logos/image-upload.png",
        totalEarned: "totalEarned",
    })
    const history_items = [
        {
            'id': 'abcdefg',
            'order_placed': '2nd June, 23',
            'total': '600',
            'duration': '2',
            'delivered_date': '5th June, 23',
            'item_name': 'Speaker',
            'item_desc': 'Sound wonderful, just looking like a wow',
            'item_image': '/Images/Store/temp.png'
        },
        {
            'id': 'abcdefg',
            'order_placed': '2nd June, 23',
            'total': '600',
            'duration': '2',
            'delivered_date': '5th June, 23',
            'item_name': 'Speaker',
            'item_desc': 'Sound wonderful, just looking like a wow',
            'item_image': '/Images/Store/temp.png'
        },
        {
            'id': 'abcdefg',
            'order_placed': '2nd June, 23',
            'total': '600',
            'duration': '2',
            'delivered_date': '5th June, 23',
            'item_name': 'Speaker',
            'item_desc': 'Sound wonderful, just looking like a wow',
            'item_image': '/Images/Store/temp.png'
        },
        {
            'id': 'abcdefg',
            'order_placed': '2nd June, 23',
            'total': '600',
            'duration': '2',
            'delivered_date': '5th June, 23',
            'item_name': 'Speaker',
            'item_desc': 'The Oyster Perpetual GMT-Master II in 18 ct yellow gold with a black dial and a Jubilee bracelet.',
            'item_image': '/Images/Store/temp.png'
        },
        {
            'id': 'abcdefg',
            'order_placed': '2nd June, 23',
            'total': '600',
            'duration': '2',
            'delivered_date': '5th June, 23',
            'item_name': 'Speaker',
            'item_desc': 'Sound wonderful, just looking like a wow',
            'item_image': '/Images/Store/temp.png'
        },
    ]
    const items = [
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
        {
            name: "Speaker",
            price: "20",
            category: "Electronics",
            imageURL: "/Images/Store/temp.png"
        },
    ]


    return (
        <>
            <div className="navbar__main">
                <Navbar />
            </div>
            <Modal isOpen={updateModal} onClose={() => showUpdateModal(!updateModal)} size={'xxl'}>
                <ModalOverlay />
                <ModalContent w={'90%'} h={'80%'} >
                    <ListItem user={user} setDiscard={() => showUpdateModal(!updateModal)} />
                </ModalContent>
            </Modal>
            {/* <PaymentConfirmationCard isOpen={paymentModal} onClose={() => showPaymentModal(!paymentModal)} /> */}
            <div className='Listing'>
                <div className='Listing__sidebar'>
                    <span
                        className='Listing__sidebar--item'
                        onClick={() => {
                            setPage('profile');
                            window.location.hash = 'profile'
                        }}>
                        <RiHome6Line style={{
                            "marginRight": "0.7rem"
                        }} />
                        <p>My Profile</p>
                    </span>
                    <span onClick={() => {
                        setPage('listings');
                        window.location.hash = 'listings'
                    }} className='Listing__sidebar--item'>
                        <FaCompass style={{
                            "marginRight": "0.7rem"
                        }} />
                        <p> Listings</p>
                    </span>
                    <span onClick={() => {
                        setPage('history');
                        window.location.hash = 'history'
                    }} className='Listing__sidebar--item'>
                        <MdInsertChartOutlined style={{
                            "marginRight": "0.7rem"
                        }} />
                        <p>History</p>
                    </span>
                    <span onClick={() => {
                        showUpdateModal(!updateModal)
                    }} className='Listing__sidebar--item'>
                        <p className='Listing__sidebar--item__text'>+ Add Item</p>
                    </span>
                </div>

                <div className='Listing__main'>
                    {
                        page === 'profile' ?
                            <div className='Listing__main--profile'>
                                <img src={user.imageURL} alt="profile" />
                                <div className='Listing__main--profile--info'>
                                    <h1>{user.name}</h1>
                                    <p>{user.email}</p>
                                    <p>{user.phone}</p>
                                    <p>{user.address}</p>
                                    <p>{user.totalEarned}</p>
                                </div>
                            </div>
                            : null
                    }
                    {
                        page === 'listings' ?
                            items.map((item, index) => (
                                <div className='Listing__main--item' key={index}>
                                    <ItemCard item={item} key={index} />
                                </div>
                            ))
                            : null
                    }
                    {
                        page === 'history' ?
                            <div>
                                {history_items.map((item, index) => {
                                    return (<div className='Listing__main--item' key={index}>
                                        <RentalHistory item={item} />
                                    </div>)
                                })}
                            </div>
                            : null
                    }
                </div>
            </div>
        </>
    )
}