/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

// Only exporting component(s) now to satisfy fast-refresh rule
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// initialize from localStorage to avoid setState inside effect
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("user");
		const token = localStorage.getItem("token");
		return savedUser && token ? JSON.parse(savedUser) : null;
	});
	const loading = false;

	const login = (userData, token) => {
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
