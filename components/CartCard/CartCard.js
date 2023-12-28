import './CartCard.scss'
import { removeCartItem } from '@/operations/cart.fetch';

const CartCard = ({ item }) => {
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

    const handleDelete = async () => {
        try {
            const data = {
                cartItemId: item.cartItemId,
                cartId: item.cartId,
            }

            const cartItem = await removeCartItem(data);
            if (cartItem.status === 200) {
                alert('Cart item removed');
                window.location.reload();
            } else {
                alert('Failed to remove cart item');
            }
        }
        catch (error) {
            alert('Failed to remove cart item');
        }
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
                            <button className='CartCard__bottom--details__content--buttons__view'
                                onClick={() => { handleDelete() }}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard