import React, { useState, useEffect } from 'react';
import './Notification.scss';

const Notification = ({ onClose, userId }) => { // add userId as a prop
    const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         const messages = await fetchMessagesOfUser(userId);
    //         if (messages) {
    //             setNotifications(messages.message);
    //         }
    //     };

    //     fetchNotifications();
    // }, [userId]);

    return (
        <div className="Notification">
            <div className="Notification__container">
                <div className="Notification__container--header">
                    <p>Notifications</p>
                    <span
                        className="Notification__container--close"
                        onClick={onClose}
                    >
                        &#10799;
                    </span>
                </div>
                <div className="Notification__containerBody">
                    {notifications.map((notification, index) => (
                        <div key={index} className="Notification__containerBody--item">
                            {notification}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;