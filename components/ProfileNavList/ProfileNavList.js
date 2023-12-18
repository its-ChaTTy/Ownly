import React from 'react';
import './ProfileNavList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faCompass, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';

function ProfileNavList() {

    return (
        <div className='navList'>
            <div className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faHouseUser} />
                <p>My Profile</p>
            </div>
            <div className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faCompass} />
                <p>My Listings</p>
            </div>
            <div className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSquarePollVertical} />
                <p>Rental History</p>
            </div>
            
        </div>
    );
};

export default ProfileNavList;