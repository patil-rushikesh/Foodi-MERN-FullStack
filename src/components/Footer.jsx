import React from 'react'
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';


const Footer = () => {
    return (
        <div>
            <footer className="footer text-base-content xl:px-24 py-10 px-4">
                <aside>
                    <img src="/logo.png" alt="" />
                    <p className='my-5 md:w-40'>
                        Savor the artistry where every dish is a culinary masterpiece
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Useful links</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Events</a>
                    <a className="link link-hover">Blogs</a>
                    <a className="link link-hover">FAQ</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Main Menu</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Offers</a>
                    <a className="link link-hover">Menus</a>
                    <a className="link link-hover">Reservation</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Contact Us</h6>
                    <a className="link link-hover">example@email.com</a>
                    <a className="link link-hover">+64 958 248 966</a>
                    <a className="link link-hover">Social media</a>
                </nav>
            </footer>
            <hr />
            <footer className="footer flex flex-wrap justify-between items-center xl:px-24 py-10 px-4">
                <nav className="flex gap-4">
                    <a href="#" aria-label="Twitter">
                        <FaTwitter size={24} className="fill-current text-green shadow-sm" />
                    </a>
                    <a href="#" aria-label="Facebook">
                        <FaFacebook size={24} className="fill-current text-green shadow-sm" />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <FaInstagram size={24} className="fill-current text-green shadow-sm" />
                    </a>
                    <a href="#" aria-label="YouTube">
                        <FaYoutube size={24} className="fill-current text-green shadow-sm" />
                    </a>
                </nav>
                <aside className="flex-grow flex justify-center">
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer
