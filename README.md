# Job Application Tracker - MERN Stack

A complete full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to help users manage and track their job applications.

## 🚀 Features

- **Authentication System**: User signup, login, and logout using JWT and bcrypt. Protected routes ensure only logged-in users can access the dashboard.
- **Job Management**: Full CRUD operations. Add, view, edit, and delete job applications.
- **Dynamic Dashboard**: View all jobs in beautiful cards. Includes filtering by status and a summary of statistics (Total, Interviews, Offers, Rejections).
- **Modern UI**: Built with React and Tailwind CSS. Features fully responsive design, toast notifications, and dark mode support.
- **Backend**: RESTful API design using Express and Mongoose for MongoDB.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, BcryptJS

## 📂 Project Architecture

```
jobTracker/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth and Error handlers
│   ├── models/          # Mongoose schemas (User, Job)
│   ├── routes/          # API endpoints
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context for State Management
│   │   ├── pages/       # Home, Login, Register, Dashboard
│   │   ├── App.jsx      # Routing setup
│   │   └── index.css    # Tailwind entry
│   ├── index.html       # Vite HTML template
│   └── tailwind.config.js
└── README.md
```

## 📋 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user and return JWT
- `GET /me` - Get current user profile (Protected)

### Jobs (`/api/jobs`)
- `GET /` - Get all jobs for the logged-in user
- `POST /` - Add a new job
- `PUT /:id` - Update a specific job
- `DELETE /:id` - Delete a specific job
- `GET /stats` - Get job statistics

## ⚙️ Setup Instructions & Running Locally

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. There is already a `.env` file with the following defaults:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/jobtracker
   JWT_SECRET=supersecretjobtrackerkey123
   NODE_ENV=development
   ```
   *(Ensure MongoDB is running locally or replace the URI with a MongoDB Atlas cluster URI).*
4. Run the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a separate terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## 🌍 Deployment Guide

### Deploying the Backend (Render/Railway)
1. Commit the code to GitHub.
2. Go to Render.com or Railway.app and create a new Web Service.
3. Connect your GitHub repo and select the `backend` directory as the root folder.
4. Set the Build Command: `npm install`
5. Set the Start Command: `node server.js`
6. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`).
7. Deploy!

### Deploying the Frontend (Vercel/Netlify)
1. Before deploying, update the `API_URL` in `src/context/AuthContext.jsx` and `src/context/JobContext.jsx` to point to your newly deployed backend URL (e.g., `https://my-backend.onrender.com/api/...`).
2. Go to Vercel.com or Netlify.com.
3. Import your GitHub repository and select the `frontend` framework as "Vite".
4. Deploy the application. Vercel/Netlify will automatically build and host the site.
