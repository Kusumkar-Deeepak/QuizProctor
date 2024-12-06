import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

const ViewScores = () => {
  const { quizLink } = useParams(); // Get the quiz link from the URL
  const [scores, setScores] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch quiz details and scores when the component mounts
  useEffect(() => {
    const fetchQuizDetailsAndScores = async () => {
      try {
        // Fetch quiz details and scores in one API call
        const response = await axios.get(
          `${API_BASE_URL}/quiz/scores/${quizLink}`
        );
        setQuizDetails(response.data.quiz); // Set quiz details
        setScores(response.data.submissions); // Set quiz scores
        console.log("data : ", response.data.submissions);
      } catch (error) {
        console.error("Error fetching quiz details or scores:", error);
      }
    };

    fetchQuizDetailsAndScores();
  }, [quizLink]);

  // Helper function to format date in a professional way
  const formatDate = (date) => {
    return format(new Date(date), "MM/dd/yyyy, hh:mm a");
  };

  // Function to assign badges for the top 3 scorers
  const getBadge = (index) => {
    if (index === 0) return "bg-yellow-500 text-white"; // Gold
    if (index === 1) return "bg-gray-400 text-white"; // Silver
    if (index === 2) return "bg-yellow-900 text-white"; // Bronze
    return "";
  };

  // Function to download the scores as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add quiz details to the PDF
    doc.setFontSize(16);
    doc.text(`Scores for: ${quizDetails.title}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Professor: ${quizDetails.teacherName}`, 20, 30);
    // Remove the following lines if you don't want to include start and end time
    // doc.text(`Start Time: ${formatDate(quizDetails.startTime)}`, 20, 40);
    // doc.text(`End Time: ${formatDate(quizDetails.endTime)}`, 20, 50);
    doc.text("----------------------------------", 20, 60);

    // Add table headers to the PDF
    doc.setFontSize(10);
    doc.text("Student Name", 20, 70);
    doc.text("Score", 80, 70);
    doc.text("Email", 120, 70);
    // doc.text('Submitted On', 160, 70); // Uncomment if you want to add 'Submitted On' column
    doc.text("Rank", 200, 70);

    // Add the quiz scores to the PDF
    scores
      .sort((a, b) => b.score - a.score) // Sort by score in descending order
      .forEach((score, index) => {
        const yOffset = 80 + index * 10; // Adjust vertical position for each row
        doc.text(score.studentName, 20, yOffset);
        doc.text(`${score.score}%`, 80, yOffset);
        doc.text(score.studentEmail, 120, yOffset);
        // doc.text(formatDate(score.submittedAt), 160, yOffset); // Uncomment if you want to add submission date
        doc.text(
          index === 0
            ? "Gold"
            : index === 1
            ? "Silver"
            : index === 2
            ? "Bronze"
            : "Rank " + (index + 1),
          200,
          yOffset
        );
      });

    // Save the PDF
    doc.save(`${quizDetails.title}_Scores.pdf`);
  };

  return (
    <div className="container mx-auto p-4">
      {quizDetails ? (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Scores for {quizDetails.title}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Quiz created by Professor {quizDetails.teacherName}
            </p>
            <p className="text-sm text-gray-500">
              Start Time:{" "}
              <span className="font-semibold">
                {formatDate(quizDetails.startTime)}
              </span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              End Time:{" "}
              <span className="font-semibold">
                {formatDate(quizDetails.endTime)}
              </span>
            </p>
          </div>

          {/* Button to download the PDF */}
          <div className="mb-4 text-right">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Download Scores as PDF
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="table-auto w-full text-sm sm:text-base">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Student Name</th>
                  <th className="px-4 py-2 text-left">Score</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Submitted On</th>
                  <th className="px-4 py-2 text-left">Rank</th>
                </tr>
              </thead>
              <tbody>
                {scores.length > 0 ? (
                  scores
                    .sort((a, b) => b.score - a.score) // Sort by score in descending order
                    .map((score, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{score.studentName}</td>
                        <td className="px-4 py-2">{score.score}%</td>
                        <td className="px-4 py-2">{score.studentEmail}</td>
                        <td className="px-4 py-2">
                          {formatDate(score.submittedAt)}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadge(
                              index
                            )}`}
                          >
                            {index === 0
                              ? "Gold"
                              : index === 1
                              ? "Silver"
                              : index === 2
                              ? "Bronze"
                              : "Rank " + (index + 1)}
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No scores available for this quiz.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading quiz details...</p>
      )}
    </div>
  );
};

export default ViewScores;
