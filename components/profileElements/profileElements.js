import Image from 'next/image';
import './profileElements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import { updateUser } from '@/operations/user.fetch';
import { logout } from '@/operations/auth.fetch';
import { isPhone } from '@/utils/validator';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aniaodrkdkwrtfkhpjgp.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function ProfileElements({ user }) {
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [location, setLocation] = useState(user.location);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(user.profilePic);

    const button = (phone === 0 || address === '' || location === '') ? true : false;

    const fileInputRef = useRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const onImageError = (e) => {
        setProfilePhotoUrl('/Images/Assets/profile.webp');
    };

    const uploadFile = async (file, file_path) => {
        const { data, error } = await supabase.storage.from('profile-photos').upload(file_path, file);
        const res = await supabase.storage.from('profile-photos').getPublicUrl(file_path);
        if (error) {
            console.log(error);
        } else {
            setProfilePhotoUrl(res.publicURL);
        }
    };

    const uploadProfilePhotoHandler = async (event) => {
        const file = event.target.files[0];
        const file_path = `${user.id}/profile`;
        if (file.size > 1024 * 1024 * 3) {
            alert('File is larger than 3MB');
            return;
        }
        await uploadFile(file, file_path);
    };

    const onSubmit = async () => {


        if (phone === 0 || address === '' || location === '') {
            alert('Please fill all the fields');
            return;
        }

        if (isNaN(phone) && !isPhone(phone)) {
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
            await logout();
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
                    <Image className='profileElements__profilePicture--workspaceAdmin--img' src={profilePhotoUrl} onError={onImageError} width={70} height={50} alt="profile" />
                    <div className="profileElements__profilePicture--workspaceAdmin--textWrapper">
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text1">{user.name}</div>
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text2">{user.email}</div>
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text2">Workspace Admin</div>
                    </div>
                </div>
                <div className='profileElements__profilePicture--upload' onClick={handleUploadClick}>
                    <FontAwesomeIcon className='profileElements__profilePicture--upload--icon' icon={faImage} />
                    <div className='profileElements__profilePicture--upload--txt'>
                        Upload Photo
                    </div>
                    <input
                        id="upload-profile-photo"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={uploadProfilePhotoHandler}
                        style={{ display: 'none' }}
                    />
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