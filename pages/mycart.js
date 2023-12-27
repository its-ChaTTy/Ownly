import { fetchCart } from '@/services/cart.service';
import { useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import { fetchAvailableItems } from '@/services/items.service';
import CartCard from '@/components/CartCard/CartCard';
import '../styles/routes/mycart.scss'
export async function getServerSideProps(context) {
  const user = context.req.session.user;

  if (user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  let cart = await fetchCart(user.id);

  const userCart = {
    userId: cart.userId,
    value: cart.value,
  }

  cart = cart.CartItem.map((item) => {
    return {
      ...item,
      startDate: JSON.stringify(item.startDate),
      endDate: JSON.stringify(item.endDate),
    }
  })

  let allItems = await fetchAvailableItems();

  cart = cart.map((item) => {
    // pickup item details from alItems and then add them to cart

    return {
      ...item,
      ...allItems.find((i) => i.id === item.itemId)
    }
  })

  return {
    props: { user: user, items: cart, userCart: userCart },
  }

}


function mycart({ user, items, userCart }) {
  useEffect(() => {
    console.log(items);
  }, [])
  return (
    <>
      <div className="section_navbar">
        <Navbar />
      </div>
      <div className='CartSection'>
        <div className='CartSection__value'>
          <p className='CartSection__value--text'>Total Cart Value - </p>
          <p className='CartSection__value--value'>Rs. {userCart.value}</p>
        </div>
        <div className='CartSection__cards'>
          {items.map((item,index) => {
            return (
              <div className='CartSection__cards--item' key={index}>
                <CartCard item={item} />
              </div>
            )
          })}
        </div>
        <div className='CartSection__buttons'>
          <button className='CartSection__buttons--checkout'>Checkout</button>
          <button className='CartSection__buttons--clear'>Clear Cart</button>
        </div>
      </div>
    </>
  )
}

export default mycart