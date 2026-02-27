import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-400">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					{/* Passenger Only Route */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute allowedRoles={["Passenger"]}>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					{/* Admin Only Route */}
					<Route
						path="/admin-dashboard"
						element={
							<ProtectedRoute allowedRoles={["Admin"]}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
