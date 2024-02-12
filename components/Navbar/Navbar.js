import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Notification from '../Notification/Notification';
import useAuth from "@/hooks/useAuth";

function Navbar() {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const { setAddModal } = useAuth();

	function scrollToSection(sectionId) {
		const section = document.getElementById(sectionId);

		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		} else {
			console.error(`Section with ID ${sectionId} not found.`);
		}
	}

	const handleUser = () => {
		router.push("/profile");
	}

	const handleNotificationClick = () => {
		setIsNotificationOpen(true);
	};

	const handleCloseNotification = () => {
		setIsNotificationOpen(false);
	};

	return (
		<div className={`Navbar ${isNotificationOpen ? 'blur' : ''}`}>
			<div className="Navbar__container">
				<FaBars className="fabar-icon" onClick={() => setIsSidebarOpen(true)} />
				<div className="Navbar__leftside">
					<div className="Navbar__container--logo">
						<Image
							src="/Images/Logos/ownly_footer_logo.webp"
							alt="Your Logo"
							width={100}
							height={100}
						/>
					</div>
					<div className="Navbar__container--pages">
						<p onClick={() => { router.push('/') }}>Home</p>
						<p onClick={() => { router.push('/productPage') }}>Listings</p>
						<p onClick={() => { scrollToSection('about') }}>About us</p>
						<p onClick={() => { scrollToSection('footer') }}>Contact</p>
					</div>
				</div>
				<div className="Navbar__rightside">
					{/* <div className="Navbar__container--search">
						<input
							type="text"
							className="search-bar"
							placeholder="Search for items to rent"
						/>
					</div> */}

					<p className="Navbar__rightside--text" onClick={() => { scrollToSection('how') }}>How it works</p>
					<p className="Navbar__rightside--text" onClick={() => {
						router.push("/profile");
						setAddModal(true);
					}}>List an Item</p>

					<div onClick={handleNotificationClick}>
						<Image style={{ cursor: "pointer" }} src={'/Images/Assets/notification.png'} width={43} height={43} />
					</div>

					<div onClick={handleUser} >
						<Link href="/profile">
							<Image style={{ cursor: "pointer" }} src={'/Images/Assets/profile.webp'} width={43} height={43} />
						</Link>
					</div>

					<div>
						<Link href={'/cart/mycart'}>
							<Image style={{ cursor: "pointer" }} src={'/Images/Assets/cart.webp'} width={43} height={43} />
						</Link>
					</div>
				</div>
			</div>
			{isSidebarOpen && (
				<div className="Navbar__sidebar">
					<FaTimes
						className="close-icon"
						onClick={() => setIsSidebarOpen(false)}
					/>
					<div className="Navbar__container--logo">
						<Image
							src="/Images/Logos/ownly_footer_logo.webp"
							alt="Your Logo"
							width={100}
							height={100}
						/>
					</div>
					<div className="Navbar__container--pages">
						<p>Home</p>
						<p>About us</p>
						<p>Contact</p>
					</div>
					{isNotificationOpen && <Notification onClose={handleCloseNotification} />}
				</div>
			)}
		</div>
	);
}

export default Navbar;
