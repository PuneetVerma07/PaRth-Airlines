import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { PlusCircle, Plane, Trash2, Users } from "lucide-react";

const AdminDashboard = () => {
	const [flights, setFlights] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		flightNumber: "",
		airlineName: "",
		source: "",
		destination: "",
		departureTime: "",
		price: "",
		seatsAvailability: 60,
	});

	const token = localStorage.getItem("token");

	// declare helper before using it
	const fetchFlights = async () => {
		const res = await API.get("/flights");
		setFlights(res.data);
	};

	useEffect(() => {
		// wrap in an async function so state updates occur inside async context
		const load = async () => {
			await fetchFlights();
		};
		load();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.post("/flights/add", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			alert("Flight Added Successfully!");
			setShowForm(false);
			fetchFlights();
		} catch (_err) {
			console.error("Add flight error", _err);
			alert("Failed to add flight. Check Admin permissions.");
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this flight?")) return;

		try {
			const token = localStorage.getItem("token");
			await API.delete(`/flights/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			alert("Flight deleted successfully!");
			// Table ko refresh karne ke liye flights state update karein
			setFlights(flights.filter((flight) => flight._id !== id));
		} catch (_err) {
			alert(_err.response?.data?.message || "Failed to delete flight");
		}
	};
	return (
		<>
			{showForm && (
				<form
					onSubmit={handleSubmit}
					className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300"
				>
					<input
						type="text"
						placeholder="Flight Number (e.g. AI-101)"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, flightNumber: e.target.value })
						}
						required
					/>
					<input
						type="text"
						placeholder="Airline Name"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, airlineName: e.target.value })
						}
						required
					/>
					<input
						type="text"
						placeholder="Source"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, source: e.target.value })
						}
						required
					/>
					<input
						type="text"
						placeholder="Destination"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, destination: e.target.value })
						}
						required
					/>
					<input
						type="datetime-local"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, departureTime: e.target.value })
						}
						required
					/>
					<input
						type="number"
						placeholder="Price (INR)"
						className="p-2 border rounded"
						onChange={(e) =>
							setFormData({ ...formData, price: e.target.value })
						}
						required
					/>
					<button
						type="submit"
						className="md:col-span-3 bg-black text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition"
					>
						Save Flight Details
					</button>
				</form>
			)}

			{/* Flight Management Table */}
			<div className="bg-white rounded-xl shadow-md overflow-hidden">
				<table className="w-full text-left">
					<thead className="bg-gray-50 border-b">
						<tr>
							<th className="p-4">Flight</th>
							<th className="p-4">Route</th>
							<th className="p-4">Departure</th>
							<th className="p-4">Seats</th>
							<th className="p-4">Price</th>
							<th className="p-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{flights.map((f) => (
							<tr key={f._id} className="border-b hover:bg-gray-50">
								<td className="p-4 font-bold">{f.flightNumber}</td>
								<td className="p-4 text-sm">
									{f.source} → {f.destination}
								</td>
								<td className="p-4 text-sm">
									{new Date(f.departureTime).toLocaleString()}
								</td>
								<td className="p-4 text-sm">{f.seatsAvailability}</td>
								<td className="p-4 font-semibold text-secondary">₹{f.price}</td>
								<td className="p-4">
									<button
										onClick={() => handleDelete(f._id)}
										className="text-red-500 hover:text-red-700"
									>
										<Trash2 size={18} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AdminDashboard;
