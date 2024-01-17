import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forgot_password = () => {
	const [email, setEmail] = useState('');

	const Navigate = useNavigate();

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:8080/api/v1/auth/forgot-password", {
				email: email
			})

			if (response.data.success) {
				setEmail({
					email: ""
				})
				Navigate("/");
			}
		} catch (error) {
			console.log("Something went wrong" + error);
		}

	}

	const handleChange = (e) => {
		const { name, value } = e.target;

		setEmail((credentials) => (
			{ ...credentials, [name]: value }
		))
	}

	return (
		<div>
			<h2>Forgot Password</h2>
			<label>Email:</label>
			<input type="email" name='email' value={email} onChange={handleChange} required />
			<button type='submit' onClick={handleForgotPassword}>Submit</button>
		</div>
	)
}

export default Forgot_password
