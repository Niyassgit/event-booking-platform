# Event Management Platform

A comprehensive full-stack application for managing events, bookings, and services. This project consists of a modern React frontend and a robust Node.js/Express backend.

## 🏗️ Architecture

The project is divided into two main components:

- **Frontend**: A React application built with TypeScript, Vite, and Tailwind CSS.
- **Backend**: A Node.js/Express API built with TypeScript and Prisma ORM.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Framer Motion
- **Routing**: React Router DOM
- **Validation**: Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: JWT & Bcrypt
- **Validation**: Zod

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd EventManagement
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create a .env file and configure your database URL
   npx prisma generate
   npx prisma migrate dev
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```text
EventManagement/
├── backend/            # Express API
│   ├── src/
│   │   ├── modules/    # Domain modules (auth, users, admin, etc.)
│   │   ├── config/     # Configuration files
│   │   ├── middlewares/# Express middlewares
│   │   └── utils/      # Utility functions
│   └── prisma/         # Database schema
├── frontend/           # React App
│   ├── src/
│   │   ├── features/   # Feature-based logic and components
│   │   ├── components/ # Shared UI components
│   │   ├── app/        # Redux store and global configuration
│   │   └── services/   # API service layers
└── README.md           # Root documentation
```

## 📜 License
This project is licensed under the MIT License.
