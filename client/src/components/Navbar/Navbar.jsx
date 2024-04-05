import React, { useState } from 'react';
import './Navbar.css';
import { RiTodoFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg ${isOpen ? 'show' : ''}`}>
                <div className="container">
                    <Link className="navbar-brand text-white" to='/' onClick={() => setIsOpen(false)}>
                        <b><RiTodoFill /> ListFlow</b>
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => setIsOpen(false)}>
                                <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item" onClick={() => setIsOpen(false)}>
                                <Link className="nav-link text-white" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item" onClick={() => setIsOpen(false)}>
                                <Link className="nav-link text-white" aria-current="page" to="/lists">Lists</Link>
                            </li>
                            <li className="nav-item" onClick={() => setIsOpen(false)}>
                                <Link to="/login">
                                    <Button
                                        btnText="LogIn"
                                        btnTextWeight="600"
                                        btnTextColor="black"
                                        btnTextSpacing="0.5px"
                                        btnBgColor="white"
                                        btnBorder="1px solid rgba(0, 0, 0, 0.1)"
                                        btnOutline="none"
                                        btnPadding="10px 25px"
                                        btnBorderRadius="50px"
                                        btnHoverShadow="0 30px 60px rgba(0, 0, 0, 0.5)"
                                        btnTransition=".3s"
                                        onClick={() => setIsOpen(false)}
                                    />
                                </Link>
                            </li>
                            <li className="nav-item" onClick={() => setIsOpen(false)}>
                                <Link to="/">
                                    <Button
                                        btnText=""
                                        btnTextWeight="600"
                                        btnTextSize="20px"
                                        btnTextColor="black"
                                        btnTextSpacing="0.5px"
                                        btnBgColor="white"
                                        btnBorder="1px solid rgba(0, 0, 0, 0.1)"
                                        btnOutline="none"
                                        btnPadding="5px 10px"
                                        btnBorderRadius="50px"
                                        btnHoverShadow="0 30px 60px rgba(0, 0, 0, 0.5)"
                                        btnTransition=".3s"
                                        icon={<IoLogOut />}
                                        onClick={() => setIsOpen(false)}
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
