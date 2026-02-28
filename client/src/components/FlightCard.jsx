import React from "react";
import { Plane, Calendar, Users } from "lucide-react";
import Button from "./Button"; // Agar aapne pehle custom Button banaya hai

const FlightCard = ({ flight, onBook }) => {
	// Destructuring flight data
	const {
		airlineName,
		flightNumber,
		source,
		destination,
		departureTime,
		seatsAvailable,
		price,
	} = flight;

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow border border-gray-100">
			{/* Airline Info */}
			<div className="flex justify-between items-start mb-6">
				<div>
					<h3 className="text-xl font-bold text-gray-800">{airlineName}</h3>
					<p className="text-sm text-gray-500 font-mono">{flightNumber}</p>
				</div>
				<Plane className="text-secondary rotate-45" size={24} />
			</div>

			{/* Route Info */}
			<div className="flex items-center justify-between mb-6 relative">
				<div className="text-center flex-1">
					<p className="text-xs text-gray-400 uppercase">From</p>
					<p className="font-bold text-lg">{source}</p>
				</div>

				{/* Decorative Line */}
				<div className="flex-1 flex flex-col items-center px-2">
					<div className="w-full border-t-2 border-dashed border-gray-200 relative top-3"></div>
					<Plane size={14} className="text-gray-300 bg-white z-10" />
				</div>

				<div className="text-center flex-1">
					<p className="text-xs text-gray-400 uppercase">To</p>
					<p className="font-bold text-lg">{destination}</p>
				</div>
			</div>

			{/* Details (Date & Seats) */}
			<div className="space-y-3 mb-6">
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Calendar size={16} className="text-secondary" />
					<span>{new Date(departureTime).toLocaleString()}</span>
				</div>
				<div className="flex items-center gap-3 text-sm text-gray-600">
					<Users size={16} className="text-secondary" />
					<span>
						Seats Available: <span className="font-bold">{seatsAvailable}</span>
					</span>
				</div>
			</div>

			{/* Price and Action */}
			<div className="flex items-center justify-between pt-4 border-t border-gray-50">
				<div className="text-2xl font-black text-primary">₹ {price}</div>
				<button
					onClick={() => onBook(flight._id)}
					className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
				>
					Book Now
				</button>
			</div>
		</div>
	);
};

export default FlightCard;
