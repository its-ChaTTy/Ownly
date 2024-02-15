import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Notification from '../Notification/Notification';
import useAuth from "@/hooks/useAuth";
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // replace '#__next' with the id of your app's root element

function Navbar() {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
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

	const handleOpenTermsModal = () => {
		setIsTermsModalOpen(true);
	};

	const handleCloseTermsModal = () => {
		router.push("/profile");
		setIsTermsModalOpen(false);
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
					<p className="Navbar__rightside--text" onClick={() => { scrollToSection('how') }}>How it works</p>
					<p className="Navbar__rightside--text" onClick={handleOpenTermsModal}>List an Item</p>

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
			<Modal
				isOpen={isTermsModalOpen}
				onRequestClose={handleCloseTermsModal}
				style={{
					content: {
						width: '50%',
						height: '70%',
						margin: 'auto',
						padding: '20px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'center'
					}
				}}
			>
				<h2 style={{ fontWeight: 'bold', fontSize: '1.8em' }}>LIST AN ITEM</h2>
				<p>1.   Think of all the great things you have to rent out in your home, from tools to toys and everything in-between. <br />
					2.  Upload Clear Photos and Videos and set a price. <br />
					3.  Provide a 360-degree view for transparency. <br />
					4.  Include a timestamp to ensure up-to-date visual. <br />
					5.  Provide proper product descriptions (dimensions/company/any specific know-how). <br />
					6.  Regularly check website notifications, respond promptly to messages, approve requests, and start completing rentals.<br />
					7.  Coordinate with the borrower to ensure a smooth exchange of the product.<br />
					8.  Take a few pictures of the items and hand them over to the borrower.<br />
					9.  We’ll pay out your earnings to your account after 24-48 hours of the rental.<br />
					10. After your product is returned, ensure it is not damaged, and ONLY then close the rental on the website.<br />
				</p>
				<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
					<button
						onClick={() => {
							setAddModal(true);
							handleCloseTermsModal();
						}}
						style={{
							backgroundColor: 'green',
							color: 'white',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}
					>
						Accept
					</button>
					<button
						onClick={handleCloseTermsModal}
						style={{
							backgroundColor: 'red',
							color: 'white',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}
					>
						Cancel
					</button>
				</div>
			</Modal>
		</div>
	);
}

export default Navbar;