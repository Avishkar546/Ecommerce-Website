import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
                email: credentials.email, password: credentials.password
            })
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.jwtToken
                })

                localStorage.setItem('auth', JSON.stringify(response.data));

                navigate("/");
            } else {
                toast.error(response.data.message);
                setCredentials({
                    password: ""
                })
            }
        } catch (error) {
            toast.success("Something went wrong");
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((credentials) =>
        (
            { ...credentials, [name]: value }
        ))
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div className="form-group m-4">
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} placeholder="Enter email" onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} placeholder="Password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary text-center mt-3">Submit</button>
                <div className="forgot-password-link">
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
            </form>
        </div>
    )
}

export default Login
