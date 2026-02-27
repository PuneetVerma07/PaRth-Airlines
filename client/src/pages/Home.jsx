import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import FlightList from "../components/FlightList";

const Home = () => {
	const [flights, setFlights] = useState([]);
	const [loading, setLoading] = useState(false);

	// Function jo Hero component se data receive karega
	const fetchFilteredFlights = async (searchParams) => {
		setLoading(true);
		try {
			// Backend query: /api/flights?source=Delhi&destination=Mumbai
			const { from, to } = searchParams;
			const res = await axios.get(
				`http://localhost:5000/flights?source=${from}&destination=${to}`,
			);
			setFlights(res.data);
		} catch (err) {
			console.error("Error filtering flights", err);
		} finally {
			setLoading(false);
		}
	};

	// Initial load par saari flights dikhane ke liye
	useEffect(() => {
		fetchFilteredFlights({ from: "", to: "" });
	}, []);

	return (
		<div>
			<Hero onSearch={fetchFilteredFlights} />
			<div className="max-w-7xl mx-auto py-12 px-4">
				<h2 className="text-3xl font-bold text-primary mb-8 border-b-2 border-secondary pb-2 w-fit">
					Available Flights
				</h2>

				{loading ? (
					<p className="text-center py-10">Searching for best flights...</p>
				) : flights.length > 0 ? (
					<FlightList flights={flights} />
				) : (
					<div className="text-center py-20 bg-white rounded-xl shadow-inner">
						<p className="text-gray-500 text-xl">
							No flights found for this route. Try another search!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
