import React from 'react'
import {
    Card,
    Button,
    CardBody,
    CardTitle,
    Stack,
    CardFooter,
    Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

function ItemCard({ item }) {

    const [image, setImage] = useState(item.imageURL)
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [category, setCategory] = useState(item.category)


    return (
        <>
            <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" width={250} height={300}>
                <CardBody>
                    <Image src={image} alt="item image" width={100} height={100} />
                    <Stack spacing={3}>
                        <Heading size={"md"} >{item.name}</Heading>
                        <Heading size={"sm"} >{item.category}</Heading>
                        <Heading size={"sm"} >{item.price}</Heading>
                    </Stack>
                </CardBody>
                <CardFooter justifyContent="space-between">
                    <Button colorScheme="blue">View Details</Button>
                    <Button colorScheme="green">Edit</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ItemCard