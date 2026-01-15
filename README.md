# Event Management Platform

A comprehensive Event Booking Platform built with modern web technologies. This application allows users to discover services, make bookings, and manage their events, while providing administrators with tools to manage services and oversee bookings.

## 🚀 Features

### User Features
- **User Authentication**: Secure Login and Signup functionality.
- **Service Discovery**: Browse available event services with details.
- **Service Details**: View detailed information about services including availability.
- **Booking System**: Book services with date validation (checks availability range and blocked dates).
- **User Dashboard**: Manage profiles and view booking history.

### Admin Features
- **Admin Dashboard**: Overview of platform activities.
- **Service Management**: Create, update, and manage service listings.
- **Booking Oversight**: View and manage user bookings.
- **User Management**: Oversee user accounts.

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT & Bcrypt
- **Validation**: Zod

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   ORIGIN="http://localhost:5173" # URL of the frontend application
   
   # Email Configuration (Optional but recommended for notifications)
   EMAIL_HOST="smtp.example.com"
   EMAIL_USER="your_email@example.com"
   EMAIL_PASS="your_email_password"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will start on the specific port (default is often 5000 or 8000).

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173`.

## 📁 Project Structure

```
EventManagement/
├── backend/                # Backend source code
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Entry point
│   └── prisma/             # Prisma schema and migrations
│
└── frontend/               # Frontend source code
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── features/       # Feature-based modules
    │   ├── pages/          # Application pages
    │   ├── store/          # Redux store setup
    │   └── utils/          # Utility functions
```
