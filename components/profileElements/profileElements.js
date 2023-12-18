import React from 'react';
import Image from 'next/image';
import './profileElements.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

function ProfileElements() {
    return (
        <div className='profileElements'>
            <div className='profileElements__profilePicture'>
                <div className='profileElements__profilePicture--text'>My Profile</div>
                <div className='profileElements__profilePicture--workspaceAdmin'>
                    <Image className='profileElements__profilePicture--workspaceAdmin--img' src={'/Images/Assets/profile.png'} width={50} height={40} />
                    <div className="profileElements__profilePicture--workspaceAdmin--textWrapper">
                        <div className="profileElements__profilePicture--workspaceAdmin--textWrapper--text1">Chaitanya Tandon</div>
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
                    <div className="profileElements__details--container--field"></div>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Email Address</div>
                    <div className="profileElements__details--container--field"></div>
                </div>
                <div className="profileElements__details--container">
                    <div className="profileElements__details--container--text">Address</div>
                    <div className="profileElements__details--container--field"></div>
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