import { paymentApprove } from "@/operations/dashboard.fetch";
import { ownerApprovedRequests } from "@/services/requests.service";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
} from '@chakra-ui/react'
import { useState } from "react";

// /g8298urjwisr/meowmeowmeow/doc/dashboard
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

    const approvedRequests = await ownerApprovedRequests();

    return {
        props: { user: user, pendingRequests: JSON.parse(JSON.stringify(approvedRequests)) },
    }

}

function dashboard({ user, pendingRequests }) {

    const [iseLoading, setIsLoading] = useState(false);
    
    const handleApprove = async (request) => {
        console.log(request);
        return;

        const data = {
            

        // const temp = request['rentReqId'].map(async (id) => {
        //     const response = await paymentApprove({ 'id1': id, 'id2': request['id'] });
        //     if (response.status != 200) {
        //         alert("Something went wrong");
        //         return;
        //     }
        // })
        // await Promise.all(temp);
        // alert("Approved");
        // window.location.reload();
    }

    return (
        <>
            {iseLoading ||
                <>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Id</Th>
                                    <Th>Payment ID</Th>
                                    <Th>Payment ScreenShot</Th>
                                    <Th>Amount</Th>
                                    <Th>Approve</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {pendingRequests.map((request, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{request.id}</Td>
                                            <Td>{request.paymentId}</Td>
                                            <Td>
                                                <img style={{ width: "20rem" }} src={request.imageURL} alt="payment screenshot" />
                                            </Td>
                                            <Td>{request.amount}</Td>
                                            {request.isPaidToTeam === false ?
                                                <Td>
                                                    <Button onClick={() => {
                                                        handleApprove(request)
                                                    }}>Approve</Button>
                                                </Td>
                                                :
                                                <Td>
                                                    Approved
                                                </Td>
                                            }

                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            }

        </>
    )
}

export default dashboard