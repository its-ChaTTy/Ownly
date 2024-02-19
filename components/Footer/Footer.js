import './Footer.scss'
import Image from 'next/image'
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Link from 'next/link';

function Footer() {

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section with ID ${sectionId} not found.`);
        }
    }

    return (
        <>
            <div className="Footer">
                <div className="Footer__container">
                    <div className="Footer__container--description">
                        <div className='Footer__container--description--logo'>
                            <Image src="/Images/Logos/ownly_footer_logo.webp" alt="Ownly Logo" width={100} height={100} />
                        </div>
                        <p style={{ fontWeight: 'bold', fontSize: '1em' }}>Rent smart, live smart!</p>
                        <div className="Footer__container--description--socials">
                            <Link href="https://www.instagram.com/ownly.in/">
                                <div className="Footer__container--description--socials--icon">
                                    <FaInstagram />
                                </div>
                            </Link>
                            <Link href="mailto:ownlyco@gmail.com">
                                <div className="Footer__container--description--socials--icon">
                                    <MdOutlineMailOutline />
                                </div>
                            </Link>
                            <Link href="https://www.linkedin.com/company/ownly-renting/">
                                <div className="Footer__container--description--socials--icon">
                                    <FaLinkedinIn />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="Footer__container--links">
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Company</p>
                            <p onClick={() => { router.push('/') }}>Home</p>
                            <p onClick={() => { scrollToSection('how') }}>How it works</p>
                            <p onClick={() => { scrollToSection('about') }}>About us</p>
                            <Link href="mailto:ownlyco@gmail.com">
                                <p>
                                    Contact Us
                                </p>
                            </Link>
                        </div>
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Support</p>
                            <Link href="./faq">
                                <p>FAQs</p>
                            </Link>
                            <p>Terms & Conditions</p>
                        </div>
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Social</p>
                            <Link href="https://www.instagram.com/ownly.in/">
                                <p>Instagram</p>
                            </Link>
                            <Link href="mailto:ownlyco@gmail.com">
                                <p>Email</p>
                            </Link>
                            <Link href="https://www.linkedin.com/company/ownly-renting/">
                                <p>LinkedIn</p>
                            </Link>
                        </div>
                    </div>
                    <div className="Footer__container--seperator">
                        <hr />
                        <span>© Copyright 2023 Ownly. All rights reserved. </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer