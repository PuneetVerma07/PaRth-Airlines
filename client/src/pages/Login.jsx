import React, { useState, useContext } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Context import karein
import Button from "../components/Button"; // Aapka reusable button

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { login } = useContext(AuthContext); // Context se login function nikalna
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			// Backend API call with /api prefix [cite: 92]
			const res = await API.post(
				"/auth/login",
				formData,
			);

			// Context ka login function call karein
			// Yeh state update karega aur Navbar turant change hoga
			login(res.data.user, res.data.token);

			alert(`Welcome back, ${res.data.user.name}!`);

			// Role-based navigation as per synopsis [cite: 30, 97]
			if (res.data.user.role === "Admin") {
				navigate("/admin-dashboard");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			alert(err.response?.data?.message || "Login Failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<form
				onSubmit={handleLogin}
				className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
			>
				<div className="flex justify-center mb-6">
					<div className="p-3 bg-primary rounded-full text-white">
						<LogIn size={32} />
					</div>
				</div>
				<h2 className="text-2xl font-bold text-center mb-6 text-primary">
					Login to PaRth Airlines
				</h2>

				<div className="space-y-4 mb-6">
					<input
						type="email"
						placeholder="Email Address"
						className="w-full p-3 border rounded-lg outline-primary"
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 border rounded-lg outline-primary"
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						required
					/>
				</div>

				{/* Using your custom Button component */}
				<Button text="Login" type="submit" className="w-full" />

				<p className="mt-4 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<span
						className="text-secondary font-bold cursor-pointer hover:underline"
						onClick={() => navigate("/signup")}
					>
						Sign Up
					</span>
				</p>
			</form>
		</div>
	);
};

export default Login;
