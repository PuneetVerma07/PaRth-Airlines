import React, { useState, useContext } from "react";
import API from '../api/axios';
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Context import
import Button from "../components/Button"; // Reusable Button

const Signup = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "Passenger",
	});
	const { login } = useContext(AuthContext); // Context se login function
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Backend signup endpoint call with /api prefix
			const res = await API.post(
				"/auth/signup",
				formData,
			);

			// Synopsis logic: Signup ke baad auto-login karna
			// Hum backend se token aur user data receive kar rahe hain
			login(res.data.user, res.data.token);

			alert("Registration Successful! Welcome to PaRth Airlines.");

			// Redirect based on role
			if (res.data.user.role === "Admin") {
				navigate("/admin-dashboard");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			alert(err.response?.data?.message || "Signup Failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
			>
				<div className="flex justify-center mb-6">
					<div className="p-3 bg-secondary rounded-full text-white">
						<UserPlus size={32} />
					</div>
				</div>
				<h2 className="text-2xl font-bold text-center mb-6 text-primary">
					Create Account
				</h2>

				<div className="space-y-4 mb-6">
					<input
						type="text"
						placeholder="Full Name"
						className="w-full p-3 border rounded-lg outline-secondary"
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
					/>

					<input
						type="email"
						placeholder="Email Address"
						className="w-full p-3 border rounded-lg outline-secondary"
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						required
					/>

					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 border rounded-lg outline-secondary"
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						required
					/>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-500 font-semibold ml-1">
							Register As:
						</label>
						<select
							className="w-full p-3 border rounded-lg outline-secondary bg-white"
							onChange={(e) =>
								setFormData({ ...formData, role: e.target.value })
							}
						>
							<option value="Passenger">Passenger</option>
							<option value="Admin">Admin</option>
						</select>
					</div>
				</div>

				{/* Using your custom modular Button */}
				<Button
					text="Create Account"
					type="submit"
					variant="primary"
					className="w-full"
				/>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<span
						className="text-primary font-bold cursor-pointer hover:underline"
						onClick={() => navigate("/login")}
					>
						Login
					</span>
				</p>
			</form>
		</div>
	);
};

export default Signup;
