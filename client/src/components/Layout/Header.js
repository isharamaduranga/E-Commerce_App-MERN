import React from 'react';
import {NavLink ,Link} from "react-router-dom";
import {HiShoppingBag} from 'react-icons/hi'

const Header = () => {
    return (<>
            <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link
                            to="/"
                            className="navbar-brand text-info"
                            >
                            <HiShoppingBag className="pb-1 text-warning" size="35px"/> E-COMMERCE
                        </Link>
                        <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link "
                                    aria-current="page"
                                    >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/category"
                                    className="nav-link "
                                    aria-current="page"
                                    >
                                    Category
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/register"
                                    className="nav-link"
                                    href="#">
                                    Register
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    className="nav-link"
                                    href="#">
                                    Login
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/cart"
                                    className="nav-link"
                                    href="#">
                                    Cart (0)
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>);
};

export default Header;
