import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        question:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
                name: data.name, email: data.email, password: data.password, phone: data.phone, address: data.address, question:data.question
            })
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.warning(response.data.message);
            }
            Navigate("/login");
            console.log(response.data);
            setData({
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                question:""
            })
        } catch (error) {
            toast.error("Something went wrong");
        }

    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div className="form-group m-4">
                    <input type="text" className="form-control" id="Name" name='name' value={data.name} placeholder="Enter Your Name" onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <input type="email" className="form-control" id="email" name='email' value={data.email} placeholder="Enter email" onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <input type="password" className="form-control" id="password" name='password' value={data.password} placeholder="Password" onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <input type="text" className="form-control" id="phone" name='phone' value={data.phone} placeholder="Mobile No." onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <textarea type="Address" className="form-control" id="Address" name='address' value={data.address} placeholder="Address" onChange={handleChange} required />
                </div>
                <div className="form-group m-4">
                    <input type="text" className="form-control" id="question" name='question' value={data.question} placeholder="Which is you favourite Sports" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary text-center mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Register
