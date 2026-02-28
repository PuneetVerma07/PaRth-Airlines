import React from "react";
import API from "../api/axios";
import { PlaneTakeoff, IndianRupee, Clock, Armchair } from "lucide-react";

const FlightList = ({ flights }) => {
	const handleBooking = async (flightId) => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("Please login to book a ticket!");
			return;
		}

		try {
			const config = { headers: { Authorization: `Bearer ${token}` } };
			// Random seat number for now as per synopsis scope
			// eslint-disable-next-line react-hooks/purity
			const seatNumber = "S" + Math.floor(Math.random() * 60);

			await API.post("/bookings/book", { flightId, seatNumber }, config);

			alert(
				"Booking Successful! Check your dashboard for the QR Boarding Pass.",
			);
		} catch (err) {
			alert(err.response?.data?.message || "Booking Failed");
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{flights.map((flight) => (
				<div
					key={flight._id}
					className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
				>
					<div className="bg-primary p-4 text-white flex justify-between items-center">
						<div className="flex items-center gap-2">
							<PlaneTakeoff size={20} />
							<span className="font-bold">{flight.airlineName}</span>
						</div>
						<span className="text-xs bg-secondary/20 px-2 py-1 rounded">
							{flight.flightNumber}
						</span>
					</div>

					<div className="p-5">
						<div className="flex justify-between items-center mb-4">
							<div>
								<p className="text-gray-500 text-xs uppercase font-bold">
									From
								</p>
								<p className="text-lg font-semibold">{flight.source}</p>
							</div>
							<div className="h-[2px] bg-gray-200 flex-1 mx-4 relative">
								<div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-white px-1">
									<PlaneTakeoff size={16} className="text-secondary" />
								</div>
							</div>
							<div className="text-right">
								<p className="text-gray-500 text-xs uppercase font-bold">To</p>
								<p className="text-lg font-semibold">{flight.destination}</p>
							</div>
						</div>

						<div className="space-y-3 mb-6">
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<Clock size={16} />
								<span>
									Departure: {new Date(flight.departureTime).toLocaleString()}
								</span>
							</div>
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<Armchair size={16} />
								<span>Seats Available: {flight.seatsAvailability}</span>
							</div>
							<div className="flex items-center gap-2 text-xl font-bold text-primary">
								<IndianRupee size={20} />
								<span>{flight.price}</span>
							</div>
						</div>

						<button
							onClick={() => handleBooking(flight._id)}
							className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-sky-600 transition shadow-lg shadow-sky-200"
						>
							Book Now
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default FlightList;
