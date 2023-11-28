import ItemCard from '@/components/ItemCard/ItemCard'
import '@/styles/routes/dashboard.scss'
import { useEffect, useState } from 'react'
import { RiHome6Line } from "react-icons/ri";
import { FaCompass } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";


export default function listingDashboard() {

    const [page, setPage] = useState('profile')

    const [user, setUser] = useState({
        name: "name",
        email: "email",
        phone: "phone",
        address: "address",
        imageURL: "/Images/Logos/image-upload.png",
        totalEarned: "totalEarned",
    })

    const items = [
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        },
        {
            name: "name",
            price: "price",
            category: "category",
            imageURL: "/Images/Logos/image-upload.png"
        }
    ]


    return (
        <>
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
                        <p>Profile</p>
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
                            <div className='Listing__main--history'>
                                <h1>History</h1>
                            </div>
                            : null
                    }
                </div>
            </div>
        </>
    )
}