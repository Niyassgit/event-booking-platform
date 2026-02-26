# Event Management Platform - Backend

This is the backend API for the Event Management Platform, built with Node.js, Express, and TypeScript.

## 🚀 Technologies

- **Express 5**: Fast, unopinionated, minimalist web framework.
- **Prisma**: Next-generation Node.js and TypeScript ORM.
- **TypeScript**: Typed superset of JavaScript.
- **JSON Web Token (JWT)**: For secure authentication.
- **Bcrypt**: For password hashing.
- **Zod**: TypeScript-first schema validation.

## 📦 Features

- **User Authentication**: Login, Registration, and JWT-based session management.
- **Service Management**: CRUD operations for various event services.
- **Booking System**: Manage event bookings and user requests.
- **Admin Dashboard**: Specialized endpoints for administrative tasks.
- **Input Validation**: Robust validation using Zod schemas.

## 🛠️ Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/event_db?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

3. **Database Migration**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

## 📂 Project Structure

- `src/modules/`: Contains domain-specific logic (e.g., auth, services, bookings). Each module typically has its own controllers, services, repositories, and routes.
- `src/middlewares/`: Shared Express middlewares (auth, error handling, etc.).
- `src/config/`: Configuration for database, environment variables, etc.
- `src/utils/`: Shared helper functions and types.
- `prisma/`: Prisma schema and migrations.
