import ListItem from '@/components/ListItem/ListItem'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useState } from 'react';

export async function getServerSideProps(context) {

  if (context.req.session.user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const user = context.req.session.user;

  return {
    props: { user: user },
  }
}
function list({ user }) {

  const [isOpen, setIsOpen] = useState(true)

  return (
    <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ListItem user={user} />
        </ModalBody>
        <ModalFooter>
          <button>Close</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}



export default list