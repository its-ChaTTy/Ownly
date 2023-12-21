import './Footer.scss'
import Image from 'next/image'
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

function Footer() {

    return (
        <>
            <div className="Footer">
                <div className="Footer__container">
                    <div className="Footer__container--description">
                        <Image src="/Images/Logos/ownly_footer_logo.webp" alt="Ownly Logo" width={100} height={100} />
                        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                        <div className="Footer__container--description--socials">
                            <div className="Footer__container--description--socials--icon">
                                <FaInstagram />
                            </div>
                            <div className="Footer__container--description--socials--icon">
                                <MdOutlineMailOutline />
                            </div>
                            <div className="Footer__container--description--socials--icon">
                                <FaLinkedinIn />
                            </div>
                        </div>
                    </div>
                    <div className="Footer__container--links">
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Company</p>
                            <p>About</p>
                            <p>Blog</p>
                            <p>Careers</p>
                            <p>Contact</p>
                            <p>Press</p>
                        </div>
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Support</p>
                            <p>Help Center</p>
                            <p>Safety Center</p>
                            <p>Community </p>
                            <p>Legal</p>
                            <p>Cookie Policy</p>
                        </div>
                        <div className="Footer__container--links--column">
                            <p className='Footer__container--links--column--title'>Social</p>
                            <p>Instagram</p>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>Youtube</p>
                            <p>LinkedIn</p>
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