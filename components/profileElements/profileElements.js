import React from 'react';
import Image from 'next/image';
import './profileElements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function ProfileElements({user}) {
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
                    <input style={{paddingLeft : "0.8rem"}} value={user.name} disabled className="profileElements__details--container--field"></input>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Email Address</div>
                    <input style={{paddingLeft : "0.8rem"}} value={user.email} disabled className="profileElements__details--container--field"></input>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Phone Number</div>
                    <input style={{paddingLeft : "0.8rem"}} className="profileElements__details--container--field"></input>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Address</div>
                    <input style={{paddingLeft : "0.8rem"}} className="profileElements__details--container--field"></input>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Location</div>
                    <input style={{paddingLeft : "0.8rem"}} className="profileElements__details--container--field"></input>
                </div>
            </div>
            <div className='profileElements__line'></div>
            <div className="profileElements__button">
                <div className="profileElements__button--cancel">Cancel</div>
                <div className='profileElements__button--saveWrapper'>
                    <div className="profileElements__button--saveWrapper--save">Save Changes</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileElements;