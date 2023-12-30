import './ProfileNavList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faCompass, faSquarePollVertical, faSignOut, faCodePullRequest } from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/hooks/useAuth';
import { logout } from '@/operations/auth.fetch';

function ProfileNavList() {
    const { setPage, setAddModal, addModal } = useAuth()

    const handleLogout = async () => {
        const res = await logout();
        if (res.status === 200) {
            window.location.href = '/';
        } else {
            alert("Something went wrong");
        }
    }

    return (
        <div className='navList'>
            <div style={{ cursor: "pointer" }} className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faHouseUser} />
                <p onClick={() => { setPage("profile") }}>My Profile</p>
            </div>
            <div style={{ cursor: "pointer" }} className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faCompass} />
                <p onClick={() => { setPage("listings") }}>My Listings</p>
            </div>
            <div style={{ cursor: "pointer" }} className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSquarePollVertical} />
                <p onClick={() => { setPage("history") }}>Rental History</p>
            </div>
            <div style={{ cursor: "pointer" }} className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faCodePullRequest} />
                <p onClick={() => { setPage("requests") }}>Rent Requests</p>
            </div>
            <div style={{ cursor: "pointer" }} className='navList__elements'>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSignOut} />
                <p onClick={() => { handleLogout() }}>Logout</p>
            </div>
            <div onClick={() => { setAddModal(!addModal) }} className='navList__elements'>
                <p className='navList__elements--add'>+ Add Item</p>
            </div>
        </div>
    );
};

export default ProfileNavList;