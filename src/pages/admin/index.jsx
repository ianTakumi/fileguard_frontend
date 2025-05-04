import React, { useState, useEffect } from "react";
import Widget from "../../components/Admin/Widget";
import BarChart from "../../components/Admin/Chart/BarChart";
import LineChart from "../../components/Admin/Chart/LineChart";
import PieChart from "../../components/Admin/Chart/PieChart";
import Map from "../../components/Admin/Map";
import { notifySuccess, notifyError } from "../../utils/Helpers";
import client from "../../utils/client";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  const getNumberofUsers = async () => {
    try {
      await client.get(`/users/count`).then((res) => {
        if (res.status === 200) {
          setUserCount(res.data.user_count);
        }
      });
    } catch (err) {
      console.error("Error fetching user count:", err);
      notifyError("Error fetching count of users");
    }
  };

  const getNumberOfContact = async () => {
    try {
      await client.get("/contacts/count").then((res) => {
        if (res.status === 200) {
          setContactCount(res.data.contact_count);
        }
      });
    } catch (err) {
      console.error("Error fetching user count:", err);
      notifyError("Error fetching number of contacts");
    }
  };

  const getNumberOfFiles = async () => {
    try {
      await client.get("/files/count").then((res) => {
        if (res.status === 200) {
          setFileCount(res.data.file_count);
        }
      });
    } catch (err) {
      console.error("Error fetching user count:", err);
      notifyError("Error fetching number of files");
    }
  };

  useEffect(() => {
    getNumberofUsers();
    getNumberOfContact();
    getNumberOfFiles();

    if (loggedIn && user && user.is_superuser === true) {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {showWelcome && (
        <div className="mt-5 bg-green-100 border border-green-200 text-green-800 p-4 shadow-md rounded-lg relative">
          <button
            className="absolute top-2 right-2 text-green-800 hover:text-green-900"
            onClick={() => setShowWelcome(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold">
            Welcome, {user ? user.name : "User"}!
          </h2>
          <p className="mt-2">
            We are glad to have you on board. This is your admin dashboard where
            you can manage all aspects of the application.
          </p>
        </div>
      )}

      <div className="flex mt-5 justify-between items-center">
        <Widget type="User" count={userCount} />
        <Widget type="Contact" count={contactCount} />
        <Widget type="File" count={fileCount} />
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <BarChart />

        <div className="flex justify-between items-center mt-4">
          <div className="text-blue-500 cursor-pointer hover:underline">
            View More
          </div>
          <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
            Download Report
          </button>
        </div>
      </div>

      {/* Container for BarChart, LineChart, and PieChart */}
      <div className="flex flex-wrap container mt-5 gap-5   rounded-lg w-full ">
        <div className="flex-grow basis-1/3 min-w-[300px] p-4 bg-white shadow rounded-lg">
          <Map />
        </div>
        <div className="flex-grow basis-1/3 min-w-[300px] justify-center items-center p-4 bg-white shadow rounded-lg">
          <PieChart />
        </div>
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <LineChart />
      </div>
    </div>
  );
};

export default Home;
