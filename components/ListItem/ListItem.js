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

function ListItem() {
    return (
        <>
            <div className='ListItem'>
                <div className='ListItem__top'></div>
                <div className='ListItem__description'></div>
                <div className='ListItem__images'></div>
                <div className='ListItem__pricing'></div>
            </div>
        </>
    )
}

export default ListItem