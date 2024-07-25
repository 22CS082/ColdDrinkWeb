import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth"; 
import "../css/Register.css";




export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);
            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                // toast.success("Registration Successfully");
                navigate("/login");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("register", error);
            toast.error("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="Register-container">
            <div className="Register-text">
                <div className="Register-header">
                    <h1>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="Register-textlabel">
                        <label htmlFor="username" style={{ fontSize: 20 }}>Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            placeholder="Enter your username"
                            value={user.username}
                            onChange={handleInput}
                            required
                            
                        />
                    </div>
                    <div className="Register-textlabel">
                        <label htmlFor="email" style={{ fontSize: 20 }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleInput}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="Register-textlabel">
                        <label htmlFor="phone" style={{ fontSize: 20 }}>Phone</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone"
                            value={user.phone}
                            onChange={handleInput}
                            required
                            autoComplete="off"
                          
                           
                        />
                    </div>
                    <div className="Register-textlabel">
                        <label htmlFor="password" style={{ fontSize: 20 }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-submit"
                        style={{ width: '100px', borderRadius: '5px' }}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="Register-image">
                <img src="/images/registerr.png" alt="login" />
            </div>
        </div>
    );
};

export default Register;
