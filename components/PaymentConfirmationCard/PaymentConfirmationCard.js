import {
    Modal, ModalOverlay,
    ModalContent,
    Button,
    CloseButton
} from '@chakra-ui/react';
import './PaymentConfirmationCard.scss'

function PaymentConfirmationCard({isOpen, onClose}) {
    return (
        <div className='PaymentConfirmationCard'>
            <Modal isOpen={isOpen} onClose={onClose} size={'md'} isCentered>
                <ModalOverlay />
                <ModalContent textAlign={'center'} className='PaymentConfirmationCard--modalContent'>
                {/* <CloseButton className='PaymentConfirmationCard--closeButton' onClick={() => { }} /> */}
                    <h1 className='PaymentConfirmationCard--h1'>Payment Sucessful</h1>
                    <p className='PaymentConfirmationCard--p'>
                        Please note that as your payment is processed manually, our team will review and confirm your payment shortly. Once verified, you will receive a final confirmation email with your order details and shipping information.
                    </p>
                    <Button onClick={() => { }}
                        backgroundColor={'#113447'}
                        color={'white'}
                        className='PaymentConfirmationCard--button'
                        borderRadius={'35px'}
                    >Order Details</Button>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default PaymentConfirmationCard