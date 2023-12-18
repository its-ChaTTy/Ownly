import Navbar from "@/components/Navbar/Navbar";
import '@/styles/routes/profile.scss'
import ProfileElements from "@/components/profileElements/profileElements";
import ProfileNavList from "@/components/ProfileNavList/ProfileNavList";

export default function Profile() {

    return (
        <div className="profile">
            <div className="profile_navbar">
                <Navbar />
            </div>
            <div className="profile_main">
                <div className="profile_main--navlist">
                    <ProfileNavList />
                </div>
                <div className="profile_main--elements">
                    <ProfileElements />
                </div>
            </div>
        </div>
    );
}