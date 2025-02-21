import React from 'react'
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
// import "chart.js/auto";


const StudentDashboard = () => {
    const [feedbackData, setFeedbackData] = useState([
        { student: "Alice", course: "Math 101", rating: 4, comments: "Great class!" },
        { student: "Bob", course: "Physics 202", rating: 5, comments: "Loved the course!" },
        { student: "Charlie", course: "Math 101", rating: 3, comments: "Needs improvement." },
        { student: "Dave", course: "Computer Science 101", rating: 4, comments: "Interesting topics." },
]);

// Calculate Metrics
const totalFeedbacks = feedbackData.length;
const averageRating =
feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks || 0;

// Group feedback by course
const courseRatings = {};
feedbackData.forEach(({ course, rating }) => {
    if (!courseRatings[course]) courseRatings[course] = [];
    courseRatings[course].push(rating);
});

const chartData = {
    labels: Object.keys(courseRatings),
    datasets: [
        {
            label: "Average Rating",
            data: Object.values(courseRatings).map((ratings) =>
                (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
    },
],
};

return (
    <div className="p-6 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-4 text-center">Student Feedback Dashboard</h1>
        
              {/* Metrics Section */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-500 text-white rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">Total Feedbacks</h2>
                  <p className="text-3xl">{totalFeedbacks}</p>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">Average Rating</h2>
                  <p className="text-3xl">{averageRating.toFixed(1)}</p>
                </div>
              </div>
        
              {/* Chart Section */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Feedback Distribution</h2>
                <Bar data={chartData} />
              </div>
        
              {/* Recent Feedback Section */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Recent Feedbacks</h2>
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border">Student</th>
                      <th className="py-2 px-4 border">Course</th>
                      <th className="py-2 px-4 border">Rating</th>
                      <th className="py-2 px-4 border">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbackData.map((feedback, index) => (
                        <tr key={index} className="text-center">
                        <td className="py-2 px-4 border">{feedback.student}</td>
                        <td className="py-2 px-4 border">{feedback.course}</td>
                        <td className="py-2 px-4 border">{feedback.rating}</td>
                        <td className="py-2 px-4 border">{feedback.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        };

export default StudentDashboard
