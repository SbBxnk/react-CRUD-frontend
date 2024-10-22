import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars } from "@fortawesome/free-solid-svg-icons";
import NavLogo from "../assets/ดาวน์โหลด.png";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full bg-base-100 sticky top-0 z-50 bg-white">
            <div className="container mx-auto navbar">
                <div className="navbar-start">
                    <Link className="btn btn-link text-xl" to="/">
                        <img src={NavLogo} alt="SR Icon" className="icon w-20" />
                    </Link>
                </div>

                <div className="lg:hidden navbar-end">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link className="btn btn-ghost" to='/home'>Home</Link></li>
                        <li><Link className="btn btn-ghost" to='/about'>About</Link></li>
                        <li><Link className="btn btn-ghost" to='/Menu'>Menu</Link></li>
                        <li><Link className="btn btn-ghost" to='/contact'>Contact</Link></li>
                        <li>
                            <details>
                                <summary className="btn btn-ghost pt-[16px]">WorkShop</summary>
                                <ul className="p-2 bg-white">
                                    <li><Link className="btn-ghost btn" to='/calgrade'>คำนวณเกรด</Link></li>
                                    <li><Link className="btn-ghost btn" to='/calage'>คำนวณอายุ</Link></li>
                                    <li><Link className="btn-ghost btn" to='/emplist'>รายชื่อพนักงาน</Link></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>

                {menuOpen && (
                    <div className="navbar-center lg:hidden absolute top-0 left-0 mt-[60px] w-full flex justify-center items-center bg-white shadow-md">
                        <div className="flex flex-col items-center">
                            <ul className="menu menu-vertical px-1 py-2">
                                <li><Link className="btn btn-ghost" to='/home'>Home</Link></li>
                                <li><Link className="btn btn-ghost" to='/about'>About</Link></li>
                                <li><Link className="btn btn-ghost" to='/Menu'>Menu</Link></li>
                                <li><Link className="btn btn-ghost" to='/contact'>Contact</Link></li>
                                <li>
                                    <details>
                                        <summary className="btn btn-ghost pt-[16px]">WorkShop</summary>
                                        <ul className="bg-white m-0 p-0">
                                            <li><Link className="btn-ghost btn" to='/calgrade'>คำนวณเกรด</Link></li>
                                            <li><Link className="btn-ghost btn" to='/calage'>คำนวณอายุ</Link></li>
                                            <li><Link className="btn-ghost btn" to='/emplist'>รายชื่อพนักงาน</Link></li>
                                        </ul>
                                    </details>
                                </li>
                                <li><Link className="btn btn-ghost" to="/login">
                                    Login
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Link></li>
                            </ul>
                        </div>
                    </div>
                )}


                <div className="navbar-end hidden lg:flex">
                    <Link className="btn btn-outline btn-warning py-0" to="/login">
                        Login
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
