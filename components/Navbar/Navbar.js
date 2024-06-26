import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Notification from '../Notification/Notification';
import useAuth from "@/hooks/useAuth";
import Modal from 'react-modal';
import RequestItem from "../RequestItem/RequestItem";

Modal.setAppElement('#__next');

function Navbar({ messages }) {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
	const { setAddModal } = useAuth();
	const [isRequestItemOpen, setIsRequestItemOpen] = useState(false);

	function scrollToSection(sectionId) {
		if (router.pathname !== '/') {
			router.push('/').then(() => {
				// Wait for the navigation to complete before scrolling
				const section = document.getElementById(sectionId);

				if (section) {
					section.scrollIntoView({ behavior: 'smooth' });
				} else {
					console.error(`Section with ID ${sectionId} not found.`);
				}
			});
		} else {
			const section = document.getElementById(sectionId);

			if (section) {
				section.scrollIntoView({ behavior: 'smooth' });
			} else {
				console.error(`Section with ID ${sectionId} not found.`);
			}
		}
	}

	const handleUser = () => {
		router.push("/profile");
	}

	const handleNotificationClick = () => {
		setIsNotificationOpen(prevState => !prevState);
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

	const handleOpenRequestItem = () => {
		setIsRequestItemOpen(true);
	};

	const handleCloseRequestItem = () => {
		setIsRequestItemOpen(false);
	};

	return (
		<div className={`Navbar ${isNotificationOpen ? 'blur' : ''}`}>
			<div className="Navbar__container">
				{/* <FaBars className="fabar-icon" onClick={() => setIsSidebarOpen(true)} /> */}
				<div className="mobile-logo">
					<Link href="/">
						<Image
							src="/Images/Logos/ownly_footer_logo.webp"
							alt="Your Logo"
							width={100}
							height={100}
						/>
					</Link>
				</div>
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
						<Link href="./tc">
							<p>T&C</p>
						</Link>
						<p onClick={() => { scrollToSection('footer') }}>Contact</p>
					</div>
				</div>
				<div className="Navbar__rightside">
					<p className="Navbar__rightside--text" onClick={handleOpenRequestItem}>Request an Item</p>
					<p className="Navbar__rightside--text" onClick={handleOpenTermsModal}>List an Item</p>

					<div onClick={handleNotificationClick}>
						<Image className="icon2" src={'/Images/Assets/notification.png'} width={43} height={43} />
					</div>

					<div onClick={handleUser} >
						<Link href="/profile">
							<Image className="icon2" src={'/Images/Assets/profile.webp'} width={43} height={43} />
						</Link>
					</div>

					<div>
						<Link href={'/cart/mycart'}>
							<Image className="icon2" src={'/Images/Assets/cart.webp'} width={43} height={43} />
						</Link>
					</div>
				</div>
			</div>
			{isNotificationOpen && <Notification messages={messages} onClose={handleCloseNotification} />}
			{isRequestItemOpen && <RequestItem isOpen={isRequestItemOpen} onRequestClose={handleCloseRequestItem} />}
			<Modal
				isOpen={isTermsModalOpen}
				onRequestClose={handleCloseTermsModal}
				style={{
					content: {
						width: '80vw',
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
				<div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
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