import { paymentApprove } from "@/operations/dashboard.fetch";
import { ownerApprovedRequests } from "@/services/requests.service";
import { fetchAllItems } from "@/services/items.service";
import { deleteItem } from '@/operations/items.fetch';
import { fetchAllItemRequests } from "@/services/items.service";
import { deleteRequestItem } from "@/operations/items.fetch";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react'
import { useState } from "react";

// `/g8298urjwisr/meowmeowmeow/doc/dashboard`
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
    const items = await fetchAllItems();
    const requestedItems = await fetchAllItemRequests();

    return {
        props: {
            user: user,
            pendingRequests: JSON.parse(JSON.stringify(approvedRequests)),
            items: JSON.parse(JSON.stringify(items)),
            requestedItems: requestedItems
        }
    }

}

function dashboard({ user, pendingRequests, items, requestedItems }) {

    const [iseLoading, setIsLoading] = useState(false);

    const removeItem = async (id, userId) => {
        const choice = window.confirm('Are you sure you want to delete this item?')
        if (choice) {
            const data = {
                id: id,
                userId: userId
            }

            const response = await deleteItem(data)
            if (response.status === 200) {
                alert('Item deleted successfully')
                window.location.reload()
            } else {
                alert('Something went wrong')
            }
        }
    }


    const removeRequestItem = async (id, item) => {
        const choice = window.confirm('Are you sure you want to delete this item request?')
        if (choice) {
            const data = {
                id: id,
                item: item
            }

            const response = await deleteRequestItem(data)
            if (response.status === 200) {
                alert('Item request deleted successfully')
                window.location.reload()
            } else {
                alert('Something went wrong')
                console.log(response)
            }
        }
    }


    const handleApprove = async (request) => {

        const data = {
            id: request.rentReqId,
            id2: request.id,
            paymentId: request.paymentId,
            amount: request.amount
        }

        const response = await paymentApprove(data);
        if (response.status === 200) {
            alert("Approved");
            window.location.reload();
        }
        else {
            console.log(response);
            alert("Something went wrong");
        }

    }

    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>
                        Payment Requests
                    </Tab>
                    <Tab>
                        Items
                    </Tab>
                    <Tab>
                        Item Requests
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
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
                    </TabPanel>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Item Name</Th>
                                        <Th>Price</Th>
                                        <Th>Category</Th>
                                        <Th>Remove</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.id}</Td>
                                                <Td>{item.name}</Td>
                                                <Td>{item.price}</Td>
                                                <Td>{item.category}</Td>
                                                <Td>
                                                    <Button onClick={() => {
                                                        removeItem(item.id, item.userId)
                                                    }}>Remove</Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Item Name</Th>
                                        <Th>Delete Request</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {requestedItems.map((item, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>{item.id}</Td>
                                                <Td>{item.item}</Td>
                                                <Td>
                                                    <Button
                                                        onClick={() => {
                                                            removeRequestItem(item.id, item.item)
                                                        }}
                                                    >Delete</Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}

export default dashboard