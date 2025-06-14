# Cryuze

Cryuze is a full-stack web application for connecting users with various services, featuring user authentication, service browsing and buying, payment integration, real-time chat, and notifications.

## Features

- User registration and login (JWT authentication)
- Browse and buy services by category and location
- Razorpay payment gateway integration
- **Real-time chat between users and service providers**
- User notifications
- Responsive frontend (React)
- RESTful backend (Node.js, Express, MongoDB, Socket.IO)

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO
- **Payments:** Razorpay
- **Authentication:** JWT

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or cloud)

### Environment Variables

Create a `.env` file in the root of the backend and frontend directories.

**Backend `.env`:**
```
PORT=3030
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Frontend `.env`:**
```
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Installation

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Usage

- Visit `http://localhost:5173` (or the port shown in your terminal) to access the frontend.
- The backend runs on `http://localhost:3030` by default.

## Real-time Chat Feature

- Users and service providers can send and receive messages in real time.
- Chat data is stored in MongoDB.
- Real-time updates are powered by Socket.IO.
- Chat endpoints are available under `/api/v1/message` and `/api/v1/conversation`.

## Folder Structure

```
Cryuze/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── .env
├── README.md
└── ...
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)