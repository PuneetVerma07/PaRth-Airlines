# PaRth Airlines ✈️

**PaRth Airlines** is a flight management and booking system built with the MERN stack. It provides administrators with tools to manage flights and offers passengers a seamless booking experience including digital boarding passes and QR code check‑in.

---

## 🚀 Features

- **Role-based Authentication** – Admin and Passenger accounts secured with JWT and password hashing.
- **Admin Dashboard** – Create, view, delete flights; monitor bookings; manage capacity.
- **Real-time Search** – Filter flights by origin, destination and departure date as you type.
- **Automated Booking Flow** – Reserve seats instantly; flight capacity updates automatically.
- **QR Boarding Pass** – Bookings generate a unique QR code for digital boarding.
- **Responsive UI** – Mobile‑friendly React interface styled with Tailwind CSS and Lucide icons.

---

## 🛠️ Tech Stack

| Layer    | Technologies               |
| -------- | -------------------------- |
| Frontend | React (Vite), Tailwind CSS |
| Backend  | Node.js, Express           |
| Database | MongoDB Atlas              |
| State    | React Context API          |
| Security | JWT, Bcrypt                |

---

## 📁 Project Structure

```
PaRth-Airlines/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # UI components (Navbar, FlightCard, etc.)
│   │   ├── context/    # AuthContext
│   │   └── pages/      # Home, Login, Dashboard
├── server/             # Express REST API
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth checks, etc.
│   └── app.js / server.js
└── README.md           # This documentation
```

---

## ⚙️ Installation & Setup

1. **Clone repository**

   ```bash
   git clone https://github.com/PuneetVerma_7/PaRth-Airlines.git
   cd PaRth-Airlines
   ```

2. **Server**

   ```bash
   cd server
   npm install
   # create a .env file with:
   # MONGO_URI=<your mongo atlas connection string>
   # JWT_SECRET=<a strong secret>
   npm start
   ```

3. **Client**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

Open `http://localhost:5173` (default Vite port) to view the app.

---

## 👥 Getting Started

- Sign up as an **Admin** or **Passenger**.
- Admins can add flight schedules via the dashboard.
- Passengers can search for flights, make bookings, and view QR boarding passes.

---

## 🔧 Development Notes

- API base URL: `/api` (e.g. `/api/auth/login`).
- Protected routes use `auth.middleware.js` to verify JWT and roles.
- Environment variables live in `.env` files for both client and server as needed.

---

## 📬 Contact

Built by **Puneet Verma**

- GitHub: [@PuneetVerma_7](https://github.com/PuneetVerma_7)
- LinkedIn: [Puneet Verma](https://www.linkedin.com/in/puneetdotio/)

Feel free to open issues or submit pull requests!
