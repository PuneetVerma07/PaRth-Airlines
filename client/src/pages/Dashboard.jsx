import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ticket, QrCode, XCircle, Plane } from "lucide-react";

const Dashboard = () => {
	const [bookings, setBookings] = useState([]);
	const [selectedBooking, setSelectedBooking] = useState(null);

	useEffect(() => {
		const fetchMyBookings = async () => {
			const token = localStorage.getItem("token");
			const res = await axios.get(
				"http://localhost:5000/bookings/my-bookings",
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			setBookings(res.data);
		};
		fetchMyBookings();
	}, []);

	const handleCancel = async (id) => {
		if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
		try {
			const token = localStorage.getItem("token");
			await axios.put(
				`http://localhost:5000/bookings/cancel/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			alert("Ticket Cancelled & Refund Initiated"); // As per synopsis
			window.location.reload();
		} catch (err) {
			alert("Cancellation failed");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-2">
				<Ticket className="text-secondary" /> My Journey Details
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{bookings.map((b) => (
					<div
						key={b._id}
						className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${b.bookingStatus === "Cancelled" ? "border-red-500" : "border-green-500"}`}
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<h3 className="font-bold text-lg">{b.flight?.airlineName}</h3>
								<p className="text-sm text-gray-500">
									{b.flight?.flightNumber}
								</p>
							</div>
							<span
								className={`px-2 py-1 rounded text-xs font-bold ${b.bookingStatus === "Cancelled" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
							>
								{b.bookingStatus}
							</span>
						</div>

						<div className="flex justify-between text-sm mb-4">
							<span>
								{b.flight?.source} → {b.flight?.destination}
							</span>
							<span className="font-mono font-bold text-secondary">
								Seat: {b.seatNumber}
							</span>
						</div>

						<div className="flex gap-2">
							<button
								onClick={() => setSelectedBooking(b)}
								className="flex-1 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-slate-800 transition"
							>
								<QrCode size={16} /> Boarding Pass
							</button>
							{b.bookingStatus !== "Cancelled" && (
								<button
									onClick={() => handleCancel(b._id)}
									className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
								>
									<XCircle size={20} />
								</button>
							)}
						</div>
					</div>
				))}
			</div>

			{/* QR Code Modal (Boarding Pass Generator)  */}
			{selectedBooking && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative">
						<button
							onClick={() => setSelectedBooking(null)}
							className="absolute top-4 right-4 text-gray-400"
						>
							✕
						</button>
						<h2 className="text-xl font-bold mb-2">Boarding Pass</h2>
						<p className="text-gray-500 text-sm mb-4">
							Scan at the gate for fast check-in
						</p>
						<img
							src={selectedBooking.qrCode}
							alt="QR Code"
							className="mx-auto w-48 h-48 border-4 border-gray-100 p-2 rounded-lg"
						/>
						<div className="mt-4 bg-gray-50 p-3 rounded-lg text-left text-xs space-y-1">
							<p>
								<strong>Passenger:</strong>{" "}
								{JSON.parse(localStorage.getItem("user")).name}
							</p>
							<p>
								<strong>Flight:</strong> {selectedBooking.flight?.flightNumber}
							</p>
							<p>
								<strong>Gate:</strong> G-12 (T3)
							</p>
						</div>
						<button
							onClick={() => window.print()}
							className="mt-6 w-full border-2 border-primary text-primary py-2 rounded-lg font-bold hover:bg-slate-800 hover:text-white transition"
						>
							Print Pass
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
