import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Search from './../Form/Search';
import { useCategories } from '../../Hooks/useCategories';

const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const categories = useCategories();

    const handleClick = (e) => {
        e.preventDefault();
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem('auth');
        toast.success("Logout succesfully");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand"><GiShoppingBag /> Ecommerce App</Link>
                    {/* Navbar right side */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <Search />
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to={"/"} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <div>
                                    <li><Link to={"/"} className="dropdown-item" >All Categories</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                </div>
                                {categories && categories.map((category, index) => (
                                    <li key={index}>
                                        <Link to={`/categories/${category.slug}`} className="dropdown-item">
                                            {category.name}
                                        </Link>
                                        {index !== categories.length - 1 && <hr className="dropdown-divider" />}
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {!localStorage.getItem('auth') ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            </>) :
                            <>
                                <li className="nav-item">
                                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin/profile" : "user/profile"}`} className="nav-link"> Dashboard </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleClick} className="nav-link"> Logout</button>
                                </li>
                            </>
                        }

                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        </nav >
    )
}
export default Navbar
