import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import API from "../api/axios"; // Hamara naya Axios Instance
import FlightCard from "../components/FlightCard"; // Flight display ke liye

const Home = () => {
	const [flights, setFlights] = useState([]);
	const [loading, setLoading] = useState(false);

	// Initial load: Kuch flights pehle se dikhane ke liye
	useEffect(() => {
		fetchFlights();
	}, []);

	const fetchFlights = async (searchParams = {}) => {
		setLoading(true);
		try {
			// Agar searchParams hain (from, to, date), toh query string banegi
			// e.g., /flights?source=Delhi&destination=Mumbai
			const { from, to, date } = searchParams;
			let url = "/flights";

			if (from || to || date) {
				url += `?source=${from || ""}&destination=${to || ""}&date=${date || ""}`;
			}

			const res = await API.get(url);
			setFlights(res.data);
		} catch (err) {
			console.error("Search failed:", err);
			// Render "wake up" warning
			alert("Server is waking up. Please wait 30 seconds and try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleBooking = async (flightId) => {
		// Pehle check karein ki user logged in hai ya nahi
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Please login to book a flight!");
			window.location.href = "/login"; // Redirect to login
			return;
		}

		if (!window.confirm("Do you want to confirm this booking?")) return;

		try {
			// API call to book the flight; generate random seat number similar to FlightList component
			const seatNumber = "S" + Math.floor(Math.random() * 60);
			const res = await API.post("/bookings/book", { flightId, seatNumber });

			if (res.status === 201 || res.status === 200) {
				alert(
					"🎉 Booking Successful! You can view your QR Boarding Pass in the Dashboard.",
				);

				// Seat count update karne ke liye flights dobara fetch karein
				fetchFlights();
			}
		} catch (err) {
			console.error("Booking Error:", err);
			// Error handling for cases like 'No seats available'
			alert(
				err.response?.data?.message || "Something went wrong during booking.",
			);
		}
	};

	return (
		<div className="min-h-screen">
			{/* Hero component ko fetchFlights function pass kar rahe hain */}
			<Hero onSearch={(data) => fetchFlights(data)} />

			<div className="container mx-auto py-12 px-4">
				<h2 className="text-3xl font-bold mb-8 text-center">
					{loading ? "Searching Best Flights..." : "Available Flights"}
				</h2>

				{flights.length === 0 && !loading ? (
					<p className="text-center text-gray-500">
						No flights found for this route.
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{flights.map((flight) => (
							<FlightCard
								key={flight._id}
								flight={flight}
								onBook={(id) => handleBooking(id)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
