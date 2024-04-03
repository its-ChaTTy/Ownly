import './ProfileNavList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faCompass, faSquarePollVertical, faSignOut, faCodePullRequest, faPlus } from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/hooks/useAuth';
import { logout } from '@/operations/auth.fetch';


function ProfileNavList() {
    const { setPage, setAddModal, addModal, page } = useAuth()

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
            <div style={{
                cursor: "pointer",
                color: page === "profile" ? "#FF6B00" : "black",
            }} className='navList__elements'
            onClick={() => { setPage("profile") }}>
                <FontAwesomeIcon className='navList__elements--icon' icon={faHouseUser} />
                <p >My Profile</p>
            </div>
            <div style={{
                cursor: "pointer",
                color: page === "listings" ? "#FF6B00" : "black",
            }} className='navList__elements' onClick={() => { setPage("listings") }} >
                <FontAwesomeIcon className='navList__elements--icon' icon={faCompass} />
                <p >My Listings</p>
            </div>
            <div style={{
                cursor: "pointer",
                color: page === "history" ? "#FF6B00" : "black",
            }} className='navList__elements' onClick={() => { setPage("history") }}>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSquarePollVertical} />
                <p >Rental History</p>
            </div>
            <div style={{
                cursor: "pointer",
                color: page === "active" ? "#FF6B00" : "black",
            }} className='navList__elements' onClick={() => { setPage("active") }}>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSquarePollVertical} />
                <p >Active Rent</p>
            </div>
            <div style={{
                cursor: "pointer",
                color: page === "requests" ? "#FF6B00" : "black",
            }} className='navList__elements' onClick={() => { setPage("requests") }}>
                <FontAwesomeIcon className='navList__elements--icon' icon={faCodePullRequest} />
                <p >Rent Requests</p>
            </div>
            <div style={{
                cursor: "pointer",
                color: page === "logout" ? "#FF6B00" : "black",
            }} className='navList__elements' onClick={() => { handleLogout() }}>
                <FontAwesomeIcon className='navList__elements--icon' icon={faSignOut} />
                <p >Logout</p>
            </div>
            <div onClick={() => { setAddModal(!addModal) }} className='navList__elements' style={{
                cursor: "pointer",
            }}>
                <FontAwesomeIcon className='navList__elements--icon--ex' icon={faPlus} />
                <p className='navList__elements--add'>+ Add Item</p>
            </div>
        </div>
    );
};

export default ProfileNavList;