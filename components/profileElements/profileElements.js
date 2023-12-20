import Image from 'next/image';
import './profileElements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { updateUser } from '@/operations/user.fetch';
import { logout } from '@/operations/auth.fetch';
import { isPhone } from '@/utils/validator';

function ProfileElements({ user }) {

    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [location, setLocation] = useState(user.location);

    const button = (phone === 0 || address === '' || location === '') ? true : false;

    const onSubmit = async () => {


        if (phone === 0 || address === '' || location === '') {
            alert('Please fill all the fields');
            return;
        }

        if(isNaN(phone) && !isPhone(phone)){
            alert('Please enter a valid phone number');
            return;
        }

        const data = {
            phone: parseInt(phone),
            address,
            location,
            userId: user.id
        }
        const response = await updateUser(data);
        if (response.status === 200) {
            alert(response.message);
            const logoutResponse = await logout();
        }
        else {
            alert(response.error);
        }
    }

    return (
        <div className='profileElements'>
            <div className='profileElements__profilePicture'>
                <div className='profileElements__profilePicture--text'>My Profile</div>
                <div className='profileElements__profilePicture--workspaceAdmin'>
                    <Image className='profileElements__profilePicture--workspaceAdmin--img' src={'/Images/Assets/profile.png'} width={70} height={50} />
                    <div className="profileElements__profilePicture--workspaceAdmin--textWrapper">
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text1">{user.name}</div>
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text2">{user.email}</div>
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text2">Workspace Admin</div>
                    </div>
                </div>
                <div className='profileElements__profilePicture--upload'>
                    <FontAwesomeIcon className='profileElements__profilePicture--upload--icon' icon={faImage} />
                    <div className='profileElements__profilePicture--upload--txt'>
                        Upload Photo
                    </div>
                </div>
            </div>
            <div className='profileElements__details'>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Full Name</div>
                    <input style={{ paddingLeft: "0.8rem" }} value={user.name} disabled className="profileElements__details--container--field" />
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Email Address</div>
                    <input style={{ paddingLeft: "0.8rem" }} value={user.email} disabled className="profileElements__details--container--field" />
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Phone Number</div>

                    {
                        user.phone === 0 ?
                            <input style={{ paddingLeft: "0.8rem" }} className="profileElements__details--container--field" onChange={(e) => setPhone(e.target.value)} />
                            :
                            <input style={{ paddingLeft: "0.8rem" }} value={phone} className="profileElements__details--container--field" disabled />
                    }

                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Address</div>
                    {
                        user.address === '' ?
                            <input style={{ paddingLeft: "0.8rem" }} className="profileElements__details--container--field" onChange={(e) => setAddress(e.target.value)} />
                            :
                            <input style={{ paddingLeft: "0.8rem" }} value={address} className="profileElements__details--container--field" disabled />
                    }
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Location</div>

                    {
                        user.location === '' ?
                            <input style={{ paddingLeft: "0.8rem" }} className="profileElements__details--container--field" onChange={(e) => setLocation(e.target.value)} />
                            :
                            <input style={{ paddingLeft: "0.8rem" }} value={location} className="profileElements__details--container--field" disabled />
                    }

                </div>
            </div>
            <div className='profileElements__line'></div>
            {
                button ?
                    <div className="profileElements__button">
                        <div className="profileElements__button--cancel">Cancel</div>
                        <div className='profileElements__button--saveWrapper'>
                            <button onClick={onSubmit} className="profileElements__button--saveWrapper--save">Save Changes</button>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};

export default ProfileElements;