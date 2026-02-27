import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Plane, LogIn, LogOut, LayoutDashboard, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	// Sirf context se data aur logout function nikalna hai
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout(); // Yeh function context ke andar se localStorage aur state dono clear kar dega
		alert("Logged out successfully!");
		navigate("/login");
	};

	return (
		<nav className="bg-primary text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
			{/* Logo Section */}
			<Link to="/" className="flex items-center gap-2 text-2xl font-bold">
				<Plane className="text-secondary rotate-45" size={32} />
				<span>
					PaRth <span className="text-secondary text-lg">Airlines</span>
				</span>
			</Link>

			<div className="flex gap-4 items-center">
				{/* AGAR USER LOGGED IN HAI (Check using context state) */}
				{user ? (
					<>
						<Link
							to={user.role === "Admin" ? "/admin-dashboard" : "/dashboard"}
							className="flex items-center gap-1 hover:text-secondary transition text-sm font-medium"
						>
							<LayoutDashboard size={18} /> Dashboard
						</Link>

						<div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
							<User size={16} className="text-secondary" />
							<span className="text-sm font-semibold">{user.name}</span>
						</div>

						<button
							onClick={handleLogout}
							className="flex items-center gap-1 bg-slate-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition border border-red-500/50 font-bold"
						>
							<LogOut size={18} /> Logout
						</button>
					</>
				) : (
					/* AGAR USER LOGGED IN NAHI HAI */
					<>
						<Link
							to="/login"
							className="flex items-center gap-1 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition border border-white/20"
						>
							<LogIn size={18} /> Login
						</Link>
						<Link
							to="/signup"
							className="flex items-center gap-1 bg-secondary px-4 py-2 rounded-lg hover:bg-sky-600 transition font-semibold"
						>
							<User size={18} /> Sign Up
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
