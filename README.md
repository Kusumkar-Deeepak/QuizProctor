# QuizProctor

### A Secure Online MCQ Test Platform with Real-Time Proctoring

QuizProctor is a web-based platform designed to facilitate secure MCQ (Multiple Choice Question) tests. It offers a proctoring feature to prevent cheating by monitoring user behavior such as tab switching or leaving the test window.

---

## Features

### Admin Features
- Create and manage MCQ tests.
- Generate and share secure test links with students.
- Monitor student submissions and view test results.

### Student Features
- Take MCQ tests within a secure environment.
- Real-time tab-switch detection to prevent cheating.
- Auto-submit the test if the student leaves the test window.

---

## Technology Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

---

## Installation and Setup

### Prerequisites
- Node.js installed on your system
- MongoDB server running

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/quizproctor.git
    cd quizproctor
    ```

2. **Install dependencies:**
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```bash
    # Run the backend
    npm run server

    # Run the frontend
    cd client
    npm run dev
    ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Journey of Building This Project

### Day 1: 04/12/2024



# 📚 Day 2: Admin Dashboard Development


# QuizProctor Project

## Journey of Building This Project

### 📅 Day 1: 04/12/2024

**1) Documentation and Planning** 📑  
On Day 1, we focused on gathering all the necessary information and laying out the foundation for the project. No coding was done on this day; instead, we focused on documentation and planning the structure of the project. The goal was to have a clear roadmap for the upcoming days. Key activities included:

- **Project Overview**: Defined the project's goals and features, including the main functionality of the Admin/Teacher dashboard, student quiz participation, and results tracking.
- **Tech Stack Decisions**: Decided on the tech stack for the project:
  - **Frontend**: React.js for building the user interface.
  - **Styling**: Tailwind CSS for responsive design and Flowbite for pre-built UI components.
  - **Backend**: Node.js and Express.js for building the backend services.
  - **Database**: MongoDB to store quiz and user data.
- **User Authentication Plan**: Decided to use JWT (JSON Web Tokens) for authentication and route protection.
- **User Roles**: Defined roles for **Admin** and **Teacher**, including specific permissions for managing quizzes and student access.
- **Wireframes**: Created wireframes for the Admin Dashboard, including key tabs like Home, Recent Quizzes, and Create a Quiz.
- **API Design**: Outlined the necessary API endpoints for user authentication, quiz management, and student interaction.

This foundational work was crucial for ensuring a smooth development process in the coming days.

---

### 📚 Day 2: 05/12/2024

## 🛠️ Features Implemented

On **Day 2**, we developed the **Admin Dashboard** for the QuizProctor project. This dashboard provides admins with the ability to manage quizzes efficiently. The dashboard consists of three tabs:

**1) Created Home Page** 🏠  
The project journey began with the design and implementation of the home page, which serves as the main entry point for users. The goal was to make the home page visually appealing, user-friendly, and responsive. We used modern web design practices, including a clean layout, intuitive navigation, and smooth user experience. Key features like the navigation bar, hero section, and footer were carefully crafted to provide users with a seamless experience as they navigate through the site.

**2) Added Register and Login Functionality for Admin/Teacher** 🔐  
A major milestone was adding authentication features for the admin and teacher users. This involved creating both the registration and login forms. The forms collect the necessary data (e.g., username, password, etc.) from the users. On submission, the server processes the data, authenticates the user, and either registers a new user or logs in an existing one.

- **Registration** 📝: The user can sign up by providing basic information, and after successful registration, the user is redirected to the login page. A success message is displayed after registration.
- **Login** 🔑: The login functionality allows the admin and teacher users to enter their credentials, authenticate them against the backend, and provide access to their respective dashboards if the credentials are correct.

For both registration and login, we used the `axios` library to handle HTTP requests and the `toast` notification library to show success or error messages based on the response from the backend. Authentication tokens are stored in `localStorage` for maintaining the user's session.

**3) Made the Routes Safe** 🔒  
To ensure the security of the application, we implemented route protection mechanisms. This ensures that only authenticated users (admin or teacher) can access certain routes, such as the admin dashboard and teacher-specific pages.

- **JWT Authentication** 🛡️: We used JSON Web Tokens (JWT) to manage user sessions. When users log in, a token is generated and stored in `localStorage`. This token is then used for subsequent requests to authenticate the user.
- **Route Protection** 🚫: We added a layer of route protection by checking the presence of the JWT token before allowing users to access certain routes. If the token is not available or is invalid, users are redirected to the login page. This ensures that unauthorized users cannot access sensitive areas of the application.

These improvements mark the foundational work for the project, ensuring a solid structure for the user interface and authentication system. The project is now ready for further features and enhancements as we continue to build out its functionality. 🚀

---

### 📚 Day 3: 06/12/2024

## 🛠️ Features Implemented

On **Day 2**, we developed the **Admin Dashboard** for the QuizProctor project. This dashboard includes the following tabs:

### 1️⃣ Home Tab
- Displays key statistics:
  - Total Quizzes
  - Total Students
  - Upcoming Quizzes
- **Future Enhancements:** Add graphs/charts for better visualization.

### 2️⃣ Recent Quizzes Tab
- Lists quizzes with titles, subjects, dates, and status.
- Actions: View, Edit, Delete quizzes.
- **Future Enhancements:** Add sorting, filtering, and pagination.

### 3️⃣ Create a Quiz Tab
- Allows admins to create new quizzes:
  - Enter Title, Description, Subject, Duration.
  - Add multiple-choice questions.
  - Save or Publish quizzes.
- **Future Enhancements:** Add validation and CSV question uploads.

## 📋 Tasks Completed Today:
- Set up Admin Dashboard with React.
- Developed tabs: **Home**, **Recent Quizzes**, **Create a Quiz**.
- Implemented CRUD functionality for quizzes.

---

### 📅 What's Next?
- Focus on improving quiz performance tracking.
- Implement additional features like user management, detailed quiz results, and analytics for quizzes.
- Enhance user interface and experience for the admin dashboard.

