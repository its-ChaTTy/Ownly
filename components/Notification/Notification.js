import { useRouter } from 'next/router';
import './Notification.scss';

const Notification = ({ onClose, messages }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/profile`); 
    };

    return (
        <div className="Notification">
            <div className="Notification__container">
                <div className="Notification__container--header">
                    <p>Notifications</p>
                </div>
                <div className="Notification__containerBody">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className="Notification__containerBody--item"
                            onClick={() => handleClick(message)}
                            style={{ cursor: 'pointer' }} // make it look clickable
                        >
                            {message} was requested. Click here to list the product.
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;