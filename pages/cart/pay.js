import { createClient } from '@supabase/supabase-js';
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
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { makePayment } from '@/operations/cart.fetch';
import { generate } from "random-words";
import { useState } from 'react';
import { useRouter } from 'next/router';

const supabaseUrl = 'https://ejemahwsmspobcfvofxe.supabase.co'
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
    // http://localhost:3000/cart/pay?id=51&user=15&price=276
    const userId = parseInt(context.query.user);

    const rentRequestId = parseInt(context.query.id);
    const value = parseInt(context.query.price);
    
    // console.log(rentRequestId, value, userId);
    if (rentRequestId === undefined || value === undefined || userId === undefined || userId === null || rentRequestId === null || value === null) {
        return {
            redirect: {
                permanent: false,
                destination: "/cart/mycart",
            },
        };
    }
    if (userId !== user.id) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/login",
            },
        };
    }
    

    return {
        props: { user: user, rentRequestId: rentRequestId, value: value },
    }

}

function pay({ user, rentRequestId, value }) {

    const [paymentId, setPaymentId] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const supabase = createClient(supabaseUrl, supabaseKey)
    const router = useRouter();

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

    const paySubmit = async () => {

        const data = {
            userId: user.id,
            rentReqId: rentRequestId, 
            amount: value,
            paymentId: paymentId,
            imageURL: imageURL
        }

        // console.log(data);

        const response = await makePayment(data);
        if (response.status === 200) {
            alert('Your request has been sent');
            router.push('/');
            window.location.reload()
        } else {
            console.log(response);
            alert('Something went wrong');
            window.location.reload();
        }
    }

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <Modal isOpen={true} onClose={() => { setIsOpen(false) }} size={'md'} isCentered>
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
            </Modal></div>
    )
}

export default pay