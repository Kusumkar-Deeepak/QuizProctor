// import React from "react";

const LearnMore = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-extrabold text-center">Check More About QuizProctor</h1>
          <p className="text-center text-lg mt-2">
            Explore the journey and features of QuizProctor and get to know the
            developer behind the project.
          </p>
        </div>
      </header>

      {/* Guide Section */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Project Guide</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold">QuizProctor</h3>
          <p className="mt-2">
            A Secure Online MCQ Test Platform with Real-Time Proctoring
          </p>
          <p className="mt-2">
            QuizProctor is a web-based platform designed to facilitate secure
            MCQ tests. It offers a proctoring feature to prevent cheating by
            monitoring user behavior such as tab switching or leaving the test
            window.
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li>
              <strong>Frontend:</strong> React.js, Tailwind CSS
            </li>
            <li>
              <strong>Backend:</strong> Node.js, Express.js
            </li>
            <li>
              <strong>Database:</strong> MongoDB
            </li>
            <li>
              <strong>Authentication:</strong> JSON Web Tokens (JWT)
            </li>
          </ul>
          <p className="mt-4">
            <a
              href="https://github.com/Kusumkar-Deeepak/QuizProctor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub Repository
            </a>
          </p>
        </div>
      </section>

      {/* Developer Section */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Developer</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold">Deepak Prakash Kusumkar</h3>
          <p className="mt-2">Full-Stack Developer</p>
          <p className="mt-2">
            Hi, I'm Deepak! I am passionate about building modern, responsive
            web applications and solving real-world problems using technology.
          </p>
          <ul className="list-disc ml-6 mt-4">
            <li>📍 Location: Latur, Maharashtra</li>
            <li>
              💻 Skills: HTML, CSS, JavaScript, React, Node.js, Express.js,
              MongoDB, Tailwind CSS
            </li>
            <li>
              🚀 Projects: QuizProctor, MediConnect, Quora Post Editor
            </li>
          </ul>
          <div className="mt-4 space-x-4">
            <a
              href="mailto:deeepak.kusumkar@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Email
            </a>
            <a
              href="https://github.com/Kusumkar-Deeepak/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/deepak-kusumkar-36776729a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-8">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-sm">© 2024 QuizProctor. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
