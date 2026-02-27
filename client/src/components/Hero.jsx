import React, { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import Button from "./Button";

const Hero = ({onSearch}) => {
	const [search, setSearch] = useState({ from: "", to: "", date: "" });

    const handleSearchClick = () => {
        // Parent component (Home.jsx) ko data bhejna
        onSearch(search)
    }

	return (
		<div className="relative h-[80vh] flex items-center justify-center text-white">
			{/* Background with Overlay */}
			<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 w-full max-w-5xl px-4 text-center">
				<h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
					Explore the World with Accuracy & Speed
				</h1>
				<p className="text-lg md:text-xl mb-12 text-gray-200">
					Find and book the best flights to your favorite destinations.
				</p>

				{/* Search Bar (Synopsis: Comprehensive Platform for Booking)*/}
				<div className="bg-white p-2 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center text-gray-800">
					<div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-2 w-full">
						<MapPin className="text-secondary" />
						<input
							type="text"
							placeholder="From (Source)"
							className="w-full outline-none p-1 font-medium"
							onChange={(e) => setSearch({ ...search, from: e.target.value })}
						/>
					</div>
					<div className="flex items-center gap-3 flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-2 w-full">
						<MapPin className="text-secondary" />
						<input
							type="text"
							placeholder="To (Destination)"
							className="w-full outline-none p-1 font-medium"
							onChange={(e) => setSearch({ ...search, to: e.target.value })}
						/>
					</div>
					<div className="flex items-center gap-3 flex-1 p-2 w-full">
						<Calendar className="text-secondary" />
						<input
							type="date"
							className="w-full outline-none p-1 font-medium"
							onChange={(e) => setSearch({ ...search, date: e.target.value })}
						/>
					</div>
					{/* Pehle (Normal state fix): 'bg-secondary' class ko default mein add karein, na ki sirf hover par */}
					<Button
						text="Search Flights"
						icon={Search}
						variant="primary"
						onClick={handleSearchClick} // Baad mein yaha API call aayegi
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
