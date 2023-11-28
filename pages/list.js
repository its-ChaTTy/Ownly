import ListItem from '@/components/ListItem/ListItem'

export async function getServerSideProps(context) {

  if (context.req.session.user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const user = context.req.session.user;

  return {
    props: { user: user },
  }
}
function list({ user }) {
  return (
    <ListItem user={user} />
  )
}



export default list