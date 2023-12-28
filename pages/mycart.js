import Cart from '@/components/Cart/Cart'
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Navbar from '@/components/Navbar/Navbar';

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

  return {
    props: { user: user },
  }

}


function mycart({ user }) {
  const [isLoading, setIsLoading] = useState(true);

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
      <div className='section_cart'>
        <Cart />
      </div>
    </>
  )
}

export default mycart