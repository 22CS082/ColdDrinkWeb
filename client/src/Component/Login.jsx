import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth"; // Ensure this import path is correct
import "../css/Login.css";


export const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("Response data:", res_data);

            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });
                // toast.success("Login Successfully");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="Login-container">
            <div className="Login-text">
                <div className="Login-header">
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="Login-textlabel">
                        <label htmlFor="email" style={{ fontSize: 20 }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="Login-textlabel">
                        <label htmlFor="password" style={{ fontSize: 20 }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="off"
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
            <div className="Login-image">
                <img src="/images/loginn.png" alt="login" />
            </div>
        </div>
    );
};

export default Login;
