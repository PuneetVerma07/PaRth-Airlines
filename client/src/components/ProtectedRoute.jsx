import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <div className="text-center py-20">Loading...</div>;

	// Agar user logged in nahi hai, toh login page par bhej do
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	// Agar role match nahi karta (e.g., Passenger trying to access Admin panel)
	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
