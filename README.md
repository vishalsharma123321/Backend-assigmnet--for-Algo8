# Backend Authentication & User Management API

This project is a Node.js-based backend system implementing authentication and user management using Express.js, MongoDB, and JWT.

## Features
- User authentication with JWT
  - Signup
  - Login
  - Logout
- CRUD operations for user management
- Role-based access control (Admin & User)
- Secure password hashing using bcrypt
- Express.js with best practices

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Installation

### 1. Clone the repository
```bash
git clone [<your-repo-link>](https://github.com/vishalsharma123321/Backend-assigmnet--for-Algo8)
cd backend-auth-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server
```bash
npm start
```
Server will run at `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint        | Description  |
|--------|----------------|--------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login` | Authenticate and get JWT |
| POST   | `/api/auth/logout` | Logout user |

### User Management
| Method | Endpoint        | Description  |
|--------|----------------|--------------|
| GET   | `/api/users/profile` | Get logged-in user's profile (Protected) |
| PUT   | `/api/users/profile` | Update user profile (Protected) |
| GET   | `/api/users/` | Get all users (Admin Only) |
| DELETE | `/api/users/:id` | Delete user (Admin Only) |

## Submission Instructions
- Ensure all functionalities are working.
- Push your code to GitHub or upload it to Google Drive.
- Share the repository link.

---

✅ Project ready for submission! 🚀

