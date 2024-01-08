import { useState } from 'react';
import styles from './Notification.scss';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const notifications = ['Notification 1', 'Notification 2', 'Notification 3']; // replace this with your actual notifications

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.notification}>
            <button onClick={toggleNotifications}>Notifications</button>
            {isOpen && (
                <div className={styles.notificationList}>
                    {notifications.map((notification, index) => (
                        <div key={index} className={styles.notificationItem}>
                            {notification}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;