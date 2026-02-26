# Event Management Platform - Frontend

A modern, responsive frontend for the Event Management Platform, built with React, Vite, and Tailwind CSS.

## 🚀 Technologies

- **React 19**: Modern UI library with hooks.
- **Vite**: Ultra-fast frontend build tool.
- **Redux Toolkit**: Predictable state management.
- **Tailwind CSS**: Utility-first CSS framework.
- **Framer Motion**: Production-ready animations.
- **Lucide React**: Beautiful icons.
- **React Router 7**: Declarative routing.
- **Zod**: Type-safe schema validation.

## ✨ Key Features

- **Interactive Event Discovery**: Search and filter through available services and events.
- **User Dashboard**: Manage your profile and view your bookings.
- **Admin Panel**: Specialized interface for managing services, users, and bookings.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Authentication Flow**: Secure login and protected routes.

## 🛠️ Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL="http://localhost:5000/api"
   ```

3. **Run the application**:
   ```bash
   # Development mode
   npm run dev

   # Build for production
   npm run build
   npm run preview
   ```

## 📂 Project Structure

- `src/features/`: Feature-sliced architecture. Each feature contains its components, logic, and state.
- `src/components/`: Reusable shared UI components (buttons, inputs, modals).
- `src/app/`: Redux store setup and global providers.
- `src/services/`: API client configurations and shared service calls.
- `src/guards/`: Route protection and authentication guards.
- `src/hooks/`: Custom React hooks for shared logic.
