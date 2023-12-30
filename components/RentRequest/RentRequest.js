import { acceptRentRequest, rejectRentRequest } from '@/operations/request.fetch';
import './RentRequest.scss'
import Image from 'next/image'

const RentRequest = ({ item, sent, user }) => {

    console.log(item)

    function formatDateString(inputDateString) {
        const dateString = inputDateString;

        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options);
    }

    const acceptRequest = async () => {
        const data = {
            id: item.id,
            userId: user.id,
            itemId: item.itemId,
            startDate: item.startDate,
            endDate: item.endDate,
        }

        const response = await acceptRentRequest(data);
        if (response.status === 200) {
            alert('Rent request accepted');
            window.location.reload();
        } else {
            alert('Failed to accept rent request');
            console.log(response)
        }
    }

    const rejectRequest = async () => {
        const data = {
            id: item.id,
            userId: user.id,
            itemId: item.itemId,
            startDate: item.startDate,
            endDate: item.endDate,
        }

        const response = await rejectRentRequest(data);
        if (response.status === 200) {
            alert('Rent request rejected');
            window.location.reload();
        } else {
            alert('Failed to reject rent request');
            console.log(response)
        }
    }

    return (
        <div className='RentRequest'>
            <div className='RentRequest__top'>
                <div className='RentRequest__top--placed'>
                    <p className='RentRequest__top--placed__text'>Start Date</p>
                    <p className='RentRequest__top--placed__value'>{formatDateString(item.startDate)}</p>
                </div>
                <div className='RentRequest__top--total'>
                    <p className='RentRequest__top--total__text'>End Date</p>
                    <p className='RentRequest__top--total__value'>{formatDateString(item.endDate)}</p>
                </div>
                <div className='RentRequest__top--duration'>
                    <p className='RentRequest__top--duration__text'>Duration</p>
                    <p className='RentRequest__top--duration__value'>{item.days}</p>
                </div>
                <div className='RentRequest__top--orderid'>
                    <p className='RentRequest__top--orderid__text'>Order Total</p>
                    <p className='RentRequest__top--orderid__value'>{item.price}</p>
                </div>
            </div>
            <div className='RentRequest__bottom'>
                <div className='RentRequest__bottom--delivered'>Status {item.status}</div>
                <div className='RentRequest__bottom--details'>
                    <img className='RentRequest__bottom--details__image' src={item.imageURL[0]} />
                    <div className='RentRequest__bottom--details__content'>
                        <p className='RentRequest__bottom--details__content--item_name'>{item.name}</p>
                        <p className='RentRequest__bottom--details__content--item_desc'>{item.description}</p>
                        {sent ||
                            <div className='RentRequest__bottom--details__content--buttons'>
                                <button className='RentRequest__bottom--details__content--buttons__again' onClick={() => { acceptRequest() }}>Accept</button>
                                <button className='RentRequest__bottom--details__content--buttons__view' onClick={() => { rejectRequest() }}>Reject</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentRequest