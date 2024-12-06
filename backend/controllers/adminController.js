// controllers/adminController.js
const Admin = require("../models/Admin");
const Quiz = require("../models/Quiz");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Create a new admin and save it to the database
    const newAdmin = new Admin({ fullName, email, password });
    await newAdmin.save();

    // Create a JWT token for the new admin
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with admin details (excluding password)
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      type: "admin",
      admin: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with admin details (excluding password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      type: "admin",
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    // Generate a unique quiz URL slug
    const quizLink = uuidv4(); // Generate a unique link

    // Create a new quiz with a unique link
    const quiz = new Quiz({
      ...req.body,
      quizLink, // Store the unique link
    });

    // Save the quiz to the database
    await quiz.save();

    // Send the quiz link in the response
    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: {
        ...quiz.toObject(),
        link: `${process.env.API_BASE_URL}/quiz/${quizLink}`, // Construct the full URL
      },
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

// Fetch all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    // Fetch quizzes from the database
    const quizzes = await Quiz.find().sort({ createdAt: -1 }); // Sort by most recent quiz
    res.status(200).json(quizzes); // Return the quizzes as JSON
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

// Get quiz details
exports.getQuizDetails = async (req, res) => {
  const { quizLink } = req.params;

  try {
    const quiz = await Quiz.findOne({ quizLink });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({
      title: quiz.title,
      description: quiz.description,
      duration: quiz.duration,
      teacherName: quiz.teacherName,
      subject: quiz.subject,
      startTime: quiz.startTime,
      endTime: quiz.endTime,
      accessToken: quiz.accessToken, // Ensure access token is available for frontend validation
      questions: quiz.questions.map((q) => ({
        question: q.question,
        options: q.options,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const { accessToken, quizLink } = req.body;

    // Logging the incoming request payload
    console.log("Incoming request:");
    console.log("Access Token:", accessToken);
    console.log("Quiz Link:", quizLink);

    // Validate input
    if (!accessToken || !quizLink) {
      console.error("Validation error: Missing accessToken or quizLink.");
      return res.status(400).json({ valid: false, message: "Access token and quiz link are required." });
    }

    // Logging before database query
    console.log("Fetching quiz from database with link:", quizLink);

    // Find quiz by link and validate token
    const quiz = await Quiz.findOne({ quizLink: quizLink });

    if (!quiz) {
      console.error("Quiz not found for link:", quizLink);
      return res.status(404).json({ valid: false, message: "Quiz not found." });
    }

    // Logging retrieved quiz details (excluding sensitive information)
    console.log("Quiz retrieved from database:", { id: quiz._id, quizLink: quiz.quizLink });

    if (quiz.accessToken === accessToken) {
      console.log("Access token is valid for quiz:", quizLink);
      return res.status(200).json({ valid: true, message: "Access token is valid." });
    } else {
      console.error("Invalid access token for quiz:", quizLink);
      return res.status(401).json({ valid: false, message: "Invalid access token." });
    }
  } catch (error) {
    console.error("Error validating access token:", error);
    res.status(500).json({ valid: false, message: "Server error." });
  }
};



// Submit quiz answers
exports.submitQuizAnswers = async (req, res) => {
  const { quizLink } = req.params;
  const { studentName, studentEmail, answers } = req.body;

  try {
    const quiz = await Quiz.findOne({ quizLink });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;
    const incorrectAnswers = quiz.questions.length - correctAnswers;

    quiz.submissions.push({
      studentName,
      studentEmail,
      score,
      correctAnswers,
      incorrectAnswers,
    });

    await quiz.save();
    res.json({ message: 'Quiz submitted successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getQuizDetailsAndScores = async (req, res) => {
  const { quizLink } = req.params; // Get the quizLink from the request parameters

  try {
    // Find the quiz by quizLink
    const quiz = await Quiz.findOne({ quizLink });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Send both quiz details and submissions (scores)
    res.status(200).json({
      quiz: {
        title: quiz.title,
        teacherName: quiz.teacherName,
        startTime: quiz.startTime,
        endTime: quiz.endTime,
      },
      submissions: quiz.submissions,
    });
  } catch (error) {
    console.error("Error fetching quiz details or scores:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
exports.endQuiz = async (req, res) => {
  try {
    // Log the incoming request body
    console.log("Received request body:", req.body);

    const { title, endTime } = req.body; // Get quiz title and endTime from request body

    // Log the received title and endTime
    console.log(`Ending quiz: ${title} at ${endTime}`);

    // Find the quiz by its title
    const quiz = await Quiz.findOne({ title: title });

    // Log the result of the quiz search
    if (!quiz) {
      console.log(`Quiz not found with title: ${title}`);
      return res.status(404).json({ message: "Quiz not found" });
    } else {
      console.log(`Quiz found: ${quiz}`);
    }

    // Update the endTime for the quiz
    quiz.endTime = endTime;

    // Log the updated quiz object before saving
    console.log("Updated quiz object:", quiz);

    await quiz.save();

    // Log the success message
    console.log("Quiz ended successfully, updated quiz:", quiz);

    res.status(200).json({ message: "Quiz ended successfully", quiz });
  } catch (error) {
    // Log the error for better insight into the issue
    console.error("Error ending quiz:", error);
    res.status(500).json({ message: "Error ending quiz", error });
  }
};
