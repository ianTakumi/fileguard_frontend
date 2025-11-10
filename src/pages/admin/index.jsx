import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Admin/Widget";
import BarChart from "../../components/Admin/Chart/BarChart";
import LineChart from "../../components/Admin/Chart/LineChart";
import PieChart from "../../components/Admin/Chart/PieChart";
import Map from "../../components/Admin/Map";
import { notifySuccess, notifyError } from "../../utils/Helpers";
import client from "../../utils/client";

const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.user);
  const [userCount, setUserCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [fileCount, setFileCount] = useState(null);
  const [contacts, setContacts] = useState([]); // For LineChart data
  const [fileTypes, setFileTypes] = useState({}); // For PieChart file type data (e.g., {"pdf": 4, "png": 3})
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch all dashboard data in one function
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Use Promise.all to fetch all data simultaneously
      const [
        usersResponse,
        contactsResponse,
        filesResponse,
        contactsListResponse,
        fileTypesResponse, // This is for PieChart
      ] = await Promise.all([
        client.get(`/users/count-total-users/`),
        client.get(`/contacts/count/`),
        client.get("/files/count-all/"),
        client.get("/contacts/"), // For LineChart
        client.get("/files/top-file-types/"), // For PieChart - this returns {"pdf": 4, "png": 3}
      ]);

      // Set all states at once
      setUserCount(usersResponse.data.total_users || 0);
      setContactCount(contactsResponse.data.count || 0);
      setFileCount(filesResponse.data.total_files || 0);
      setContacts(
        contactsListResponse.data?.data || contactsListResponse.data || []
      );
      setFileTypes(fileTypesResponse.data || {}); // This will be {"pdf": 4, "png": 3}
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      notifyError("Error loading dashboard data");

      // Set defaults on error
      setUserCount(0);
      setContactCount(0);
      setFileCount(0);
      setContacts([]);
      setFileTypes({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    if (loggedIn && user && user.is_superuser === true) {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn]);

  // Skeleton Loading Component
  const WidgetSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg p-6 w-full max-w-xs">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

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
            Welcome, {user ? user.first_name + " " + user.last_name : "User"}!
          </h2>
          <p className="mt-2">
            We are glad to have you on board. This is your admin dashboard where
            you can manage all aspects of the application.
          </p>
        </div>
      )}

      <div className="flex mt-5 justify-between items-center gap-4">
        {loading ? (
          <>
            <WidgetSkeleton />
            <WidgetSkeleton />
            <WidgetSkeleton />
          </>
        ) : (
          <>
            <Widget type="User" count={userCount} />
            <Widget type="Contact" count={contactCount} />
            <Widget type="File" count={fileCount} />
          </>
        )}
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-full"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/6"></div>
            </div>
          </div>
        ) : (
          <>
            <BarChart />
            <div className="flex justify-between items-center mt-4">
              <div className="text-blue-500 cursor-pointer hover:underline">
                View More
              </div>
              <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
                Download Report
              </button>
            </div>
          </>
        )}
      </div>

      {/* Container for Map and PieChart */}
      <div className="flex flex-wrap container mt-5 gap-5 rounded-lg w-full">
        <div className="flex-grow basis-1/3 min-w-[300px] p-4 bg-white shadow rounded-lg">
          {loading ? (
            <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
          ) : (
            <Map />
          )}
        </div>
        <div className="flex-grow basis-1/3 min-w-[300px] justify-center items-center p-4 bg-white shadow rounded-lg">
          {loading ? (
            <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
          ) : (
            <PieChart fileTypes={fileTypes} />
          )}
        </div>
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        {loading ? (
          <div className="animate-pulse h-64 bg-gray-200 rounded"></div>
        ) : (
          <LineChart contacts={contacts} />
        )}
      </div>
    </div>
  );
};

export default Home;
