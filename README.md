# Backend Assignment for Algo8

## Description
This is a backend authentication and user management system built using Node.js, Express.js, and MongoDB. The project includes user signup, login, logout, and CRUD operations for managing users.

## Features
- **Authentication using JWT**
  - Signup
  - Login
  - Logout
- **User Management APIs**
  - Create, Read, Update, and Delete users
- **Security Enhancements**
  - Password hashing with bcrypt
  - Authentication middleware for protected routes
  - Input validation
- **Express.js & MongoDB Integration**
- **Well-structured Codebase following best practices**

## Tech Stack
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB & Mongoose** - NoSQL database & ODM
- **JWT (JSON Web Token)** - Authentication mechanism
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vishalsharma123321/Backend-assigmnet--for-Algo8.git
   cd Backend-assigmnet--for-Algo8
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```sh
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Run the server:
   ```sh
   npm run server
   ```
   The server will start at `http://localhost:5000`

## API Endpoints

### Authentication Routes
| Method | Endpoint         | Description      |
|--------|-----------------|------------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Login and receive a JWT token |
| POST   | `/api/auth/logout` | Logout user |

### User Management Routes (Protected)
| Method | Endpoint         | Description      |
|--------|-----------------|------------------|
| GET    | `/api/users/profile` | Get logged-in user's profile |
| PUT    | `/api/users/:id` | Update user details |
| DELETE | `/api/users/:id` | Delete a user |

## Folder Structure
```
Backend-assigmnet--for-Algo8/
│-- src/
│   │-- config/
│   │   ├── db.js
│   │-- controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │-- middlewares/
│   │   ├── authMiddleware.js
│   │-- models/
│   │   ├── User.js
│   │-- routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │-- utils/
│   │   ├── authUtils.js
│   ├── server.js
│-- .env
│-- .gitignore
│-- package.json
│-- README.md
```

## Deployment
You can deploy this project on platforms like **Render, Vercel, or Heroku**.

## Contributing
Feel free to open issues or submit pull requests to improve this project.

## License
This project is licensed under the MIT License.
