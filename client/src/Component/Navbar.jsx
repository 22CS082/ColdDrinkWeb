import "../css/Navbar.css";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

function Navbar() {
    const { isLoggedIn, user,logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src="/images/logo.png" width="100px" height="auto" alt="logo" />
            </div>
            <ul className="navbar__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                <li><Link to="/product">Product</Link></li>


                {isLoggedIn ? (
                    <>
                    { user && user.isadmin && (
                        <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
                    )}
                <li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
                </>
                ) : (
                <>
                    <li>
                        <Link to="/register" className="register-button">Register</Link>
                    </li>
                    <li>
                        <Link to="/login" className="login-button">Login</Link>
                    </li>
                </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
