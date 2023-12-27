import './CartCard.scss'
import Image from 'next/image'

// cartId
// : 
// 1
// category
// : 
// "FITNESS"
// days
// : 
// 1
// description
// : 
// "Testing Product Add"
// endDate
// : 
// "\"2023-12-28T18:30:00.000Z\""
// id
// : 
// 8
// imageURL
// : 
// ['https://aniaodrkdkwrtfkhpjgp.supabase.co/storage/v1/object/public/ownly-images/level']
// isAvailable
// : 
// true
// itemId
// : 
// 8
// name
// : 
// "Tesing Product"
// price
// : 
// 40
// startDate
// : 
// "\"2023-12-27T18:30:00.000Z\""
// userId
// : 
// 3

const CartCard = ({ item }) => {
    function formatDateString(inputDateString) {
        const dateString = inputDateString.slice(1, -1);

        // Alternatively, you can use regular expression to remove double quotes
        // const dateString = inputDateString.replace(/^"(.*)"$/, '$1');

        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return date.toLocaleDateString('en-US', options);
    }
    return (
        <div className='CartCard'>
            <div className='CartCard__top'>
                <div className='CartCard__top--placed'>
                    <p className='CartCard__top--placed__text'>Start Date</p>
                    <p className='CartCard__top--placed__value'>{formatDateString(item.startDate)}</p>
                </div>
                <div className='CartCard__top--total'>
                    <p className='CartCard__top--total__text'>End Date</p>
                    <p className='CartCard__top--total__value'>{formatDateString(item.endDate)}</p>
                </div>
                <div className='CartCard__top--duration'>
                    <p className='CartCard__top--duration__text'>Order Duration</p>
                    <p className='CartCard__top--duration__value'>{item.days}</p>
                </div>
                <div className='CartCard__top--orderid'>
                    <p className='CartCard__top--orderid__text'>Order Total</p>
                    <p className='CartCard__top--orderid__value'>{item.price}</p>
                </div>
            </div>
            <div className='CartCard__bottom'>
                <div className='CartCard__bottom--delivered'>Category {item.category}</div>
                <div className='CartCard__bottom--details'>
                    <img className='CartCard__bottom--details__image' src={item.imageURL[0]} />
                    <div className='CartCard__bottom--details__content'>
                        <p className='CartCard__bottom--details__content--item_name'>{item.name}</p>
                        <p className='CartCard__bottom--details__content--item_desc'>{item.description}</p>
                        <div className='CartCard__bottom--details__content--buttons'>
                            {/* <button className='CartCard__bottom--details__content--buttons__again'>Rent it again</button> */}
                            <button className='CartCard__bottom--details__content--buttons__view'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard