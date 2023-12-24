import Cart from '@/components/Cart/Cart'
import { fetchCart } from '@/services/cart.service';
import { useEffect } from 'react';

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

  return {
    props: { user: user, items: cart, userCart: userCart },
  }

}

// userCart: { userId: 1, value: 804 }
//   items: [
//     {
//       id: 6,
//       itemId: 5,
//       cartId: 3,
//       startDate: 2023-12-24T05:25:05.161Z,
//       endDate: 2023-12-27T18:30:00.000Z,
//       days: 4,
//       price: 800
//     },
//     {
//       id: 7,
//       itemId: 7,
//       cartId: 3,
//       startDate: 2023-12-24T05:37:53.185Z,
//       endDate: 2023-12-27T18:30:00.000Z,
//       days: 4,
//       price: 4
//     }
//   ]
// }


function mycart({ user, items, userCart }) {

  return (
    <Cart />
  )
}

export default mycart