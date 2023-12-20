import Navbar from "@/components/Navbar/Navbar";
import '@/styles/routes/profile.scss'
import ProfileElements from "@/components/profileElements/profileElements";
import ProfileNavList from "@/components/ProfileNavList/ProfileNavList";
import useAuth from "@/hooks/useAuth";
import RentalHistory from '@/components/RentalHistory/RentalHistory';
import ItemCard from '@/components/ItemCard/ItemCard'
import {
    Modal, ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import ListItem from '@/components/ListItem/ListItem';
import { getAllItemsByUser } from "@/services/items.service";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {

    if (context.req.session.user === undefined) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
        };
    }

    const allItems = await getAllItemsByUser(context.req.session.user.id);

    const user = context.req.session.user;
    return {
        props: { user: user, allItems: allItems },
    }

}

export default function Profile({ user, allItems }) {

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

    const { page, addModal, setAddModal, editItem, setEditItem } = useAuth();

    useEffect(() => {
        if(!addModal)
            setEditItem(null);

            console.log(editItem);

    }, [addModal, editItem])

    return (
        <>
            <Modal isOpen={addModal} onClose={() => setAddModal(!addModal)} size={'xxl'}>
                <ModalOverlay />
                <ModalContent w={'90%'} h={'80%'} >
                    <ListItem user={user} item={editItem} />
                </ModalContent>
            </Modal>
            <div className="profile">
                <div className="profile_navbar">
                    <Navbar />
                </div>
                <div className="profile_main">
                    <div className="profile_main--navlist">
                        <ProfileNavList />
                    </div>
                    <div className="profile_main--elements">
                        {
                            page === 'profile' ?
                                <ProfileElements user={user} /> :
                                null
                        }
                        {
                            page === 'listings' ?
                                <div className="profile_main--elements__listings">
                                    {allItems.map((item, index) => (
                                        <div className="profile_main--elements__listings--card" key={index}>
                                            <ItemCard item={item} key={index} />
                                        </div>
                                    ))}
                                </div> :
                                null
                        }
                        {
                            page === 'history' ?
                                <div className="profile_main--elements__history">
                                    {history_items.map((item, index) => {
                                        return (
                                            <div className='Listing__main--item' key={index}>
                                                <RentalHistory item={item} />
                                            </div>)
                                    })}
                                </div> :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    );
}