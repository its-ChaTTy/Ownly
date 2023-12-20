import Cart from '@/components/Cart/Cart'

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
  return (
    <Cart />
  )
}

export default mycart