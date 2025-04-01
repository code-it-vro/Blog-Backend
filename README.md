
# Blog Backend

This is a backend API for a Blog platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides functionality for user authentication, blog creation, and management. The API allows users to sign up, log in, create, update, and delete blogs. 

---

## Features that are implemented:

- **User Authentication**:
  - Signup and login functionality with JWT-based authentication.
  - Secure password hashing with bcrypt.
  - Profile image upload.

- **Blog Management**:
  - Create blogs with a title, description, and image.
  - Retrieve a list of all blogs.
  - Update and delete blogs.
  - Blogs are associated with users, and each blog has an author field.

---


## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-backend.git
   cd blog-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project with the following environment variables:

   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

   Replace `your_mongo_connection_string` with your MongoDB URI (either from MongoDB Atlas or your local MongoDB instance) and `your_jwt_secret_key` with a secret key for JWT signing.

4. Start the development server:

   ```bash
   node server.js
   ```

   This will start the server on `http://localhost:3000` and connect to MongoDB.

---

## API Endpoints

### Authentication

1. **POST** `/api/auth/signup`: Register a new user.

   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   
   - **Response**:
     ```json
     {
       "message": "User created successfully",
       "token": "jwt_token_here",
       "user": {
         "_id": "user_id",
         "email": "user@example.com",
         "profileImage": null
       }
     }
     ```

2. **POST** `/api/auth/login`: Login an existing user.

   - **Request Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

   - **Response**:
     ```json
     {
       "message": "Login successful",
       "token": "jwt_token_here",
       "user": {
         "_id": "user_id",
         "email": "user@example.com",
         "profileImage": null
       }
     }
     ```

### Blog Management

1. **POST** `/api/blogs`: Create a new blog (authentication required).

   - **Request Body** (form-data):
     ```json
     {
       "title": "My First Blog",
       "description": "This is my first blog",
       "image": "imagepath.jpg"
     }
     ```

   - **Response**:
     ```json
     {
       "message": "Blog created successfully",
       "blog": {
         "_id": "blog_id",
         "title": "My First Blog",
         "image": "imagepath.jpg",
         "description": "This is my first blog",
         "author": "user_id"
       }
     }
     ```

2. **GET** `/api/blogs`: Get all blogs.

   - **Response**:
     ```json
     [
       {
         "_id": "blog_id",
         "title": "Blog Title",
         "image": "imagepath.jpg",
         "description": "Blog description",
         "author": "user_id"
       },
       ...
     ]
     ```

3. **PUT** `/api/blogs/:id`: Update a specific blog (authentication required).

   - **Request Body**:
     ```json
     {
       "title": "Updated Blog Title",
       "description": "This is the updated blog description",
       "image": "updated_image.jpg"
     }
     ```

   - **Response**:
     ```json
     {
       "message": "Blog updated successfully",
       "blog": {
         "_id": "blog_id",
         "title": "Updated Blog Title",
         "image": "updated_image.jpg",
         "description": "This is the updated blog description",
         "author": "user_id"
       }
     }
     ```

4. **DELETE** `/api/blogs/:id`: Delete a specific blog (authentication required).

   - **Response**:
     ```json
     {
       "message": "Blog deleted successfully"
     }
     ```

---

## Testing the API

You can test the API using Postman or any other API testing tool.

### Test Cases:

- **Signup**: Make a `POST` request to `/api/auth/signup` with email and password.
- **Login**: Make a `POST` request to `/api/auth/login` with email and password to get a JWT token.
- **Create Blog**: Make a `POST` request to `/api/blogs` with the required fields (title, description, image) and attach the JWT token in the authorization header.
- **Get Blogs**: Make a `GET` request to `/api/blogs` to fetch all blogs.
- **Update Blog**: Make a `PUT` request to `/api/blogs/:id` with the new blog data (title, description, image) and the JWT token.
- **Delete Blog**: Make a `DELETE` request to `/api/blogs/:id` with the JWT token to delete a blog.

---

