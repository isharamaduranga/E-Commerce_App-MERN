import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {HiShoppingBag} from 'react-icons/hi'
import {useAuth} from "../../context/auth";
import {toast} from 'react-toastify';
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import {useCart} from "../../context/cart";
import { Badge } from 'antd';
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogOut = () => {
        setAuth({
            ...auth, user: null, token: '',
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully ...")
    };

    return (<>
            <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className=" fa-sharp fa-solid fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link
                            to="/"
                            className="navbar-brand text-warning"
                        >
                            <HiShoppingBag className="pb-1 text-warning" size="35px"/> E-COMMERCE
                        </Link>
                        <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">

                            <li className="nav-item pt-1 me-5">
                                <SearchInput/>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className="nav-link "
                                    aria-current="page"
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle"
                                      to={"/categories"}
                                      data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">

                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/categories`}
                                        >
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c, index) => (
                                        <li key={index}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>

                                        </li>))}
                                </ul>
                            </li>

                            {!auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/register"
                                            className="nav-link">
                                            Register
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            to="/login"
                                            className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item dropdown ">
                                        <NavLink className="nav-link dropdown-toggle " role="button"
                                                 data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth?.user.role === 1 ? 'admin' : 'user'}`}
                                                    className="dropdown-item"
                                                >DashBoard
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink
                                                    onClick={handleLogOut}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </>

                            )}
                            <li className="nav-item mt-2">
                                <Badge count={cart?.length} overflowCount={10}>
                                    <NavLink
                                        to="/cart"
                                        className="nav-link"
                                        href="#">
                                        CART
                                    </NavLink>
                                </Badge>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
