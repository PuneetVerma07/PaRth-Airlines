import React, { useEffect, useState } from "react";
import API from "../api/axios"; // Naya Axios Instance use karein
import { Ticket, QrCode, XCircle } from "lucide-react";

const Dashboard = () => {
	const [bookings, setBookings] = useState([]);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch My Bookings logic update
	useEffect(() => {
		const fetchMyBookings = async () => {
			try {
				// Ab headers manually likhne ki zaroorat nahi hai
				const res = await API.get("/bookings/my-bookings");
				setBookings(res.data);
			} catch (err) {
				console.error("Failed to load bookings", err);
			} finally {
				setLoading(false);
			}
		};
		fetchMyBookings();
	}, []);

	const handleCancel = async (id) => {
		if (!window.confirm("Are you sure you want to cancel this ticket?")) return;
		try {
			// Simplified API call using instance
			await API.put(`/bookings/cancel/${id}`);
			alert("Ticket Cancelled & Refund Initiated (As per Synopsis)");

			// Reload ki jagah state update karna better UX hai
			setBookings(
				bookings.map((b) =>
					b._id === id ? { ...b, bookingStatus: "Cancelled" } : b,
				),
			);
		} catch (err) {
			alert(err.response?.data?.message || "Cancellation failed");
		}
	};

	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading your journeys...
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-2">
				<Ticket className="text-secondary" /> My Journey Details
			</h1>

			{bookings.length === 0 ? (
				<div className="text-center py-20 text-gray-500">
					No journeys found. Book your first flight now!
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{bookings.map((b) => (
						<div
							key={b._id}
							className={`bg-white rounded-xl shadow-md p-5 border-l-4 transition-transform hover:scale-[1.02] ${
								b.bookingStatus === "Cancelled"
									? "border-red-500"
									: "border-green-500"
							}`}
						>
							<div className="flex justify-between items-start mb-4">
								<div>
									<h3 className="font-bold text-lg">
										{b.flight?.airlineName || "Airline Name"}
									</h3>
									<p className="text-sm text-gray-500">
										{b.flight?.flightNumber}
									</p>
								</div>
								<span
									className={`px-2 py-1 rounded text-xs font-bold ${
										b.bookingStatus === "Cancelled"
											? "bg-red-100 text-red-600"
											: "bg-green-100 text-green-600"
									}`}
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
			)}

			{/* QR Code Modal */}
			{selectedBooking && (
				<div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
					<div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative shadow-2xl">
						<button
							onClick={() => setSelectedBooking(null)}
							className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
						>
							✕
						</button>
						<h2 className="text-xl font-bold mb-2">Digital Boarding Pass</h2>
						<p className="text-gray-500 text-sm mb-6">
							Scan for paperless entry at G-12 (T3)
						</p>

						<img
							src={selectedBooking.qrCode}
							alt="Boarding QR"
							className="mx-auto w-48 h-48 border-4 border-gray-100 p-2 rounded-lg mb-6"
						/>

						<div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-2 border border-gray-100">
							<p>
								<strong>Passenger:</strong>{" "}
								{JSON.parse(localStorage.getItem("user"))?.name}
							</p>
							<p>
								<strong>Flight:</strong> {selectedBooking.flight?.flightNumber}{" "}
								| {selectedBooking.flight?.airlineName}
							</p>
							<p>
								<strong>Route:</strong> {selectedBooking.flight?.source} to{" "}
								{selectedBooking.flight?.destination}
							</p>
						</div>

						<button
							onClick={() => window.print()}
							className="mt-6 w-full border-2 border-primary text-primary py-2 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
						>
							Print Ticket (PDF)
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
