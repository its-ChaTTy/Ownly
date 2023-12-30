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
import { fetchAvailableItems, getAllItemsByUser } from "@/services/items.service";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { fetchAllCompletedBorrowing } from "@/services/rent.service";
import { getAllRequests, getUserRequests } from "@/services/requests.service";
import RentRequest from "@/components/RentRequest/RentRequest";

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
    const lent = await fetchAllCompletedBorrowing(context.req.session.user.id);
    const allAvailableItems = await fetchAvailableItems()
    const history = lent.map((rent) => {
        return {
            id: rent.id,
            total: rent.price,
            item_name: rent.item.name,
            item_desc: rent.item.description,
            item_image: rent.item.imageURL[0],
            order_placed: JSON.stringify(rent.startDate),
            delivered_date: JSON.stringify(rent.endDate),
            duration: JSON.stringify(new Date(rent.endDate).getDate() - new Date(rent.startDate).getDate())
        }
    })

    const user = context.req.session.user;
    const allRequests = await getAllRequests();
    const userRequests = await getUserRequests(user.id);
    let recievedRequests = [];
    let sentRequests = [];

    allRequests.forEach((request) => {
        const item = allItems.find((item) => item.id === request.itemId);
        if (item) {
            recievedRequests.push({
                ...item,
                ...request,
            });
        }
    })

    userRequests.forEach((request) => {
        const item = allAvailableItems.find((item) => item.id === request.itemId);
        
        if (item) {
            sentRequests.push({
                ...item,
                ...request,
            });
        }
    })

    return {
        props: { user: user, allItems: allItems, history: history, sentRequests: JSON.parse(JSON.stringify(sentRequests)), recievedRequests: JSON.parse(JSON.stringify(recievedRequests)) },
    }

}

export default function Profile({ user, allItems, history, sentRequests, recievedRequests }) {

    const [isLoading, setIsLoading] = useState(true);

    const { page, addModal, setAddModal, editItem, setEditItem } = useAuth();

    useEffect(() => {
        if (!addModal)
            setEditItem(null);
    }, [addModal, editItem])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <LoadingSpinner />}
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
                                    {history.map((item, index) => {
                                        return (
                                            <div className='Listing__main--item' key={index}>
                                                <RentalHistory item={item} />
                                            </div>)
                                    })}
                                </div> :
                                null
                        }
                        {
                            page === 'requests' ?
                                <div className="profile_main--elements__requests">
                                    <p className="profile_main--elements__requests--text">Recieved Requests</p>
                                    {
                                        recievedRequests.map((item, index) => {
                                            if (item.ownerStatus !== 'REJECTED') {
                                                return (
                                                    <div className='Listing__main--item' key={index}>
                                                        <RentRequest item={item} sent={false} user={user} />
                                                    </div>)
                                            }
                                        })
                                    }
                                    <p className="profile_main--elements__requests--text">Sent Requests</p>
                                    {
                                        sentRequests.map((item, index) => {
                                            return (
                                                <div className='Listing__main--item' key={index}>
                                                    <RentRequest item={item} sent={true} user={user} />
                                                </div>)
                                        })
                                    }
                                </div> :
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    );
}