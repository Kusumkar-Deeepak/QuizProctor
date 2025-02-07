// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  teacherName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true},
  subject: { type: String, required: true },
  accessToken: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  quizLink: { type: String, required: true, unique: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  // New field to store student submissions
  submissions: [
    {
      studentName: { type: String, required: true },
      studentEmail: { type: String, required: true },
      score: { type: Number, required: true },
      correctAnswers: { type: Number, required: true },
      incorrectAnswers: { type: Number, required: true },
      submittedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
