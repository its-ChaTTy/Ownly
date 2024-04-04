import { useState } from 'react';
import Modal from 'react-modal';
import { askForAnItem } from '@/operations/request.fetch';
import { AiOutlineClose } from 'react-icons/ai'; 
import "./RequestItem.scss";

Modal.setAppElement('#__next'); 

export default function RequestItem({ isOpen, onRequestClose }) {
    const [item, setItem] = useState('');

    const handleSubmit = async (item, event) => {
        event.preventDefault();
        const data = { item: item };
        const response = await askForAnItem(data);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Request Item"
            className="modal"
        >
            <AiOutlineClose className="close-icon" onClick={onRequestClose} /> 
            <form onSubmit={e => handleSubmit(item, e)}>
                <h1 className='requestHeading'>Request an item</h1>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" onChange={e => setItem(e.target.value)} required />
                </div>
                <div className='buttonContainer'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </Modal>
    );
}