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


