import { fetchCart } from '@/services/cart.service';
import Navbar from "@/components/Navbar/Navbar";
import { fetchAvailableItems } from '@/services/items.service';
import CartCard from '@/components/CartCard/CartCard';
import '@/styles/routes/mycart.scss'
import { createRentRequest } from '@/operations/request.fetch';
import { removeCartItem } from '@/operations/cart.fetch';
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
      cartItemId: item.id,
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
  const [isLoading, setIsLoading] = useState(true);
  const handleCheckout = async () => {

    try {

      const requests = items.map(async (item) => {

        const rentreq = {
          itemId: item.itemId,
          userId: item.userId,
          startDate: item.startDate.slice(1, -1),
          endDate: item.endDate.slice(1, -1),
          price: item.price,
          cartId: item.cartId,
        };

        const response = await createRentRequest(rentreq);

        if (response.status === 200) {
          console.log(response);
        } else {
          console.log(response);
          throw new Error('Failed to create rent request');
        }
      });

      await Promise.all(requests);

      const cartItems = items.map(async (item) => {
        const data = {
          cartItemId: item.cartItemId,
          cartId: item.cartId,
        }
        const response = await removeCartItem(data);
        if (response.status === 200) {
          console.log(response);
        } else {
          console.log(response);
          throw new Error('Failed to remove cart item');
        }
      })
      await Promise.all(cartItems)

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="section_navbar">
        <Navbar />
      </div>
      {
        userCart.value === 0 ?
          <div className='CartSection__empty'>
            <p className='CartSection__empty--text'>Your Cart is Empty, Add some items to cart</p>
          </div>
          :
          <div className='CartSection'>
            <div className='CartSection__value'>
              <p className='CartSection__value--text'>Total Cart Value - </p>
              <p className='CartSection__value--value'>Rs. {userCart.value}</p>
            </div>
            <div className='CartSection__cards'>
              {items.map((item, index) => {
                return (
                  <div className='CartSection__cards--item' key={index}>
                    <CartCard item={item} />
                  </div>
                )
              })}
            </div>
            <div className='CartSection__buttons'>
              <button onClick={() => { handleCheckout() }} className='CartSection__buttons--checkout'>Checkout</button>
              <button className='CartSection__buttons--clear'>Clear Cart</button>
            </div>
          </div>
      }
    </>
  )
}

export default mycart