import './Notification.scss';

const Notification = ({ onClose, messages }) => {
    return (
        <div className="Notification">
            <div className="Notification__container">
                <div className="Notification__container--header">
                    <p>Notifications</p>
                    {/* <span
                        className="Notification__container--close"
                        onClick={onClose}
                    >
                        &#10799;
                    </span> */}
                </div>
                <div className="Notification__containerBody">
                    {messages.map((message, index) => (
                        <div key={index} className="Notification__containerBody--item">
                            {message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notification;