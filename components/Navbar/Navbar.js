import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
	const router = useRouter();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	function scrollToSection(sectionId) {
		const section = document.getElementById(sectionId);
	
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		} else {
			console.error(`Section with ID ${sectionId} not found.`);
		}
	}

	const handleLogin = () => {
		router.push("/auth/login");
	};

	const handleSignup = () => {
		router.push("/auth/register");
	};

	const handleUser = () => {
		router.push("/profile");
	}

	return (
		<div className="Navbar">
			<div className="Navbar__container">
				<FaBars className="fabar-icon" onClick={() => setIsSidebarOpen(true)} />
				<div className="Navbar__leftside">
					<div className="Navbar__container--logo">
						<Image
							src="/Images/Logos/ownly_footer_logo.png"
							alt="Your Logo"
							width={100}
							height={100}
						/>
					</div>
					<div className="Navbar__container--pages">
						<p onClick={() => {router.push('/')}}>Home</p>
						<p onClick={() => scrollToSection('how')}>Features</p>
						<p onClick={() => {scrollToSection('howItWorks')}}>How it works</p>
						<p onClick={() => {scrollToSection('about')}}>About us</p>
						<p onClick={() => {scrollToSection('footer')}}>Contact</p>
					</div>
				</div>
				<div className="Navbar__rightside">
					<div className="Navbar__container--search">
						<input
							type="text"
							className="search-bar"
							placeholder="Search for items to rent"
						/>
					</div>
					
					<div onClick={handleUser} >
						<Link href="/profile">
							<Image style={{cursor: "pointer"}} src={'/Images/Assets/profile.png'} width={43} height={43} />
						</Link>
					</div>
					
					<div>
						<Image style={{cursor: "pointer"}} src={'/Images/Assets/cart.png'} width={43} height={43} />

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
							src="/Images/Logos/ownly_footer_logo.png"
							alt="Your Logo"
							width={100}
							height={100}
						/>
					</div>
					<div className="Navbar__container--pages">
						<p>Home</p>
						<p>How it works</p>
						<p>About us</p>
						<p>Contact</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
