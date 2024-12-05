// routes/adminRoutes.js
const express = require('express');
const { registerAdmin, loginAdmin, createQuiz, getAllQuizzes, getQuizDetails, submitQuizAnswers } = require('../controllers/adminController');

const router = express.Router();

// Route for admin registration
router.post('/register', registerAdmin);

// Route for admin login
router.post('/login', loginAdmin);

// Route to create a new quiz
router.post('/quiz', createQuiz);

// Get all quizzes
router.get('/quizzes', getAllQuizzes);

// Route to get quiz details based on accessToken or quizLink
router.get('/quiz/:quizLink', getQuizDetails);

// Route to submit quiz answers
router.post('/submit/:quizLink', submitQuizAnswers);

module.exports = router;
