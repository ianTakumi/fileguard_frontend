import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ contacts = [] }) => {
  // Calculate the number of messages per month from contacts prop
  const calculateMonthlyData = () => {
    const counts = new Array(12).fill(0);

    contacts.forEach((contact) => {
      try {
        if (contact && contact.created_at) {
          const month = new Date(contact.created_at).getMonth();
          if (!isNaN(month) && month >= 0 && month < 12) {
            counts[month] += 1;
          }
        }
      } catch (error) {
        console.error("Error processing contact:", contact, error);
      }
    });

    return counts;
  };

  const monthlyData = calculateMonthlyData();

  // Data for the LineChart
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Contact Us Messages",
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  // Chart options with animations
  const options = {
    responsive: true,
    // 🎬 ADD ANIMATIONS HERE
    animation: {
      duration: 2000, // 2 seconds animation
      easing: "easeOutQuart", // Smooth easing
      animateScale: true,
      animateRotate: true,
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0,
          },
          y: {
            from: 0,
          },
        },
      },
      hide: {
        animations: {
          x: {
            to: 0,
          },
          y: {
            to: 0,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Contact Us Messages (January - December)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Messages: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
