import { fetchCart } from '@/services/cart.service';
import Navbar from "@/components/Navbar/Navbar";
import { fetchAvailableItems } from '@/services/items.service';
import CartCard from '@/components/CartCard/CartCard';
import '@/styles/routes/mycart.scss'
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { generate } from "random-words";
import { makePayment, removeCartItem } from '@/operations/cart.fetch';
import { createRentRequest } from '@/operations/request.fetch';

import {
  Modal, ModalOverlay,
  ModalContent,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Image
} from '@chakra-ui/react';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://aniaodrkdkwrtfkhpjgp.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

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
  const [isOpen, setIsOpen] = useState(false);
  const [paymentId, setPaymentId] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [rentRequestId, setRentReqId] = useState([]);

  const supabase = createClient(supabaseUrl, supabaseKey)

  async function uploadFile(file, file_path) {

    setIsLoading(true);
    const { data, error } = await supabase.storage.from('payments').upload(file_path, file)
    const res = supabase.storage.from('payments').getPublicUrl(file_path);
    if (error) {
      console.log(error)
    } else {
      setImageURL(res['data'].publicUrl)
    }
    setIsLoading(false);
  }

  const uploadImages = async (file) => {
    const file_path = generate();
    if (file.size > 1024 * 1024 * 3) {
      alert('File is larger than 3MB');
      return;
    }
    await uploadFile(file, file_path);
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    setIsOpen(true);

    // return;
    try {

      const requests = items.map(async (item) => {

        const rentreq = {
          itemId: item.itemId,
          userId: user.id,
          startDate: item.startDate.slice(1, -1),
          endDate: item.endDate.slice(1, -1),
          price: item.price,
          cartId: item.cartId,
        };

        const response = await createRentRequest(rentreq);

        if (response.status === 200) {
          console.log(response);
          const temp = response['request']['id'];
          setRentReqId(rentRequestId => [...rentRequestId, temp]);
          console.log(rentRequestId);
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

    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const paySubmit = async () => {

    const data = {
      userId: user.id,
      rentReqId: rentRequestId, //
      amount: userCart.value,
      paymentId: paymentId,
      imageURL: imageURL
    }

    console.log(data);
    // return;

    const response = await makePayment(data);
    if (response.status === 200) {
      alert('Your request has been sent');
      window.location.reload()
    } else {
      console.log(response);
      alert('Something went wrong');
      window.location.reload();
    }
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="section_navbar">
        <Navbar />
      </div>
      {
        isOpen && <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }} size={'md'} isCentered>
          <ModalOverlay />
          <ModalContent>
            <CloseButton onClick={() => { setIsOpen(false) }} />
            <Image src={"/Images/Store/qr.jpg"} alt="QR Code" height={"auto"} width={"65%"} objectFit="cover" />
            <FormControl id="paymentId">
              <FormLabel>Payment ID</FormLabel>
              <Input type="text" onChange={(e) => { setPaymentId(e.target.value) }} />
            </FormControl>
            <FormControl id="imageURL">
              <FormLabel>Upload Payment Screenshot</FormLabel>
              <Input type="file" onChange={(e) => { uploadImages(e.target.files[0]) }} />
            </FormControl>
            <Button onClick={() => { paySubmit() }}>Submit</Button>
          </ModalContent>
        </Modal>
      }
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