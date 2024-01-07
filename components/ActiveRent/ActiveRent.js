import './ActiveRent.scss'
import Image from 'next/image'

const ActiveRent = ({ item }) => {

    function formatDateString(inputDateString) {
        const dateString = inputDateString.slice(1, -1);

        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className='ActiveRent'>
            <div className='ActiveRent__top'>
                <div className='ActiveRent__top--placed'>
                    <p className='ActiveRent__top--placed__text'>Order Placed</p>
                    <p className='ActiveRent__top--placed__value'>{formatDateString(item.order_placed)}</p>
                </div>
                <div className='ActiveRent__top--total'>
                    <p className='ActiveRent__top--total__text'>Total</p>
                    <p className='ActiveRent__top--total__value'>{item.total}</p>
                </div>
                <div className='ActiveRent__top--duration'>
                    <p className='ActiveRent__top--duration__text'>Duration</p>
                    <p className='ActiveRent__top--duration__value'>{item.duration}</p>
                </div>
                <div className='ActiveRent__top--orderid'>
                    <p className='ActiveRent__top--orderid__text'>Order ID</p>
                    <p className='ActiveRent__top--orderid__value'>{item.id}</p>
                </div>
            </div>
            <div className='ActiveRent__bottom'>
                <div className='ActiveRent__bottom--delivered'>Delivered On {formatDateString(item.delivered_date)}</div>
                <div className='ActiveRent__bottom--details'>
                    <Image width={140} height={140} src={item.item_image} />
                    <div className='ActiveRent__bottom--details__content'>
                        <p className='ActiveRent__bottom--details__content--item_name'>{item.item_name}</p>
                        <p className='ActiveRent__bottom--details__content--item_desc'>{item.item_desc}</p>
                        <div className='ActiveRent__bottom--details__content--buttons'>
                            <button className='ActiveRent__bottom--details__content--buttons__again'>Rent it again</button>
                            <button className='ActiveRent__bottom--details__content--buttons__view'>View your item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveRent