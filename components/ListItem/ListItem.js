import './ListItem.scss'
import {
    Card,
    Select,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from '@chakra-ui/react'
import Image from 'next/image'
import { FaArrowLeft } from "react-icons/fa6";

function ListItem() {
    return (
        <>
            <div className='ListItem'>
                <div className='ListItem__top'>
                    <Button className='ListItem__top--back' leftIcon={<FaArrowLeft />} variant='ghost'></Button>
                    <div className='ListItem__top--content'>
                        <p>Back to home</p>
                        <h1>Add New Product</h1>
                    </div>
                </div>
                <div className='ListItem__description'>
                    <h1>Description</h1>
                    <Card className='ListItem__description--card' style={{
                        border: '1.5px solid #E2E8F0',
                        height: '100%'
                    }}>
                        <FormControl id="title">
                            <FormLabel>Product Name</FormLabel>
                            <Input placeholder="Enter title" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Product Description</FormLabel>
                            <Textarea placeholder="Enter description" style={{
                                resize: 'none'
                            }} />
                        </FormControl>
                        <FormControl id="category">
                            <FormLabel>Product Category</FormLabel>
                            <Select placeholder="Select category">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </Select>
                        </FormControl>
                    </Card>
                </div>
                <div className='ListItem__images'>
                    <h1>Product Images</h1>
                    <Card className='ListItem__images--card' style={{
                        border: '1.5px solid #E2E8F0',
                        height: '100%'
                    }}>
                        <FormControl id="images">
                            <Input type='file' />
                        </FormControl>
                    </Card>
                </div>
                <div className='ListItem__pricing'>
                    <h1>Pricing</h1>
                    <Card className='ListItem__pricing--card' style={{
                        border: '1.5px solid #E2E8F0',
                        height: '100%'
                    }}>
                        <FormControl id="price">
                            <FormLabel>Price</FormLabel>
                            <Input placeholder="Enter price" />
                        </FormControl>
                        <div className='ListItem__pricing--card--buttons'>
                            <Button variant='ghost'>Discard</Button>
                            <Button variant='solid'>Submit</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default ListItem