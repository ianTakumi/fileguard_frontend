import React from "react";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaFileAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Widget = ({ type, count }) => {
  let data;
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (data.url) navigate(data.url);
  };

  switch (type) {
    case "User":
      data = {
        title: "USERS",
        count: count,
        url: "/admin/users",
        link: "See all users",
        icon: (
          <FaUserAlt
            style={{
              width: "4rem",
              height: "4rem",
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "Contact":
      data = {
        title: "Contacts",
        count: count,
        url: "/admin/contacts",
        link: "View all contacts",
        icon: (
          <FaPhoneAlt
            style={{
              width: "4rem",
              height: "4rem",
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "File":
      data = {
        title: "All Files",
        count: count,
        link: "",
        icon: (
          <FaFileAlt
            style={{
              width: "4rem",
              height: "4rem",
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    case "Earnings":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <FaMoneyBillAlt
            style={{
              width: "4rem",
              height: "4rem",
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between p-6 shadow-md rounded-lg w-96 h-40 bg-white">
      <div className="flex flex-col justify-between">
        <span className="font-bold text-lg text-gray-600">{data.title}</span>
        <span className="text-4xl font-medium">
          {data.isMoney && "₱"} {count}
        </span>
        {data.link && (
          <span
            className="text-sm border-b border-gray-400 w-max cursor-pointer"
            onClick={handleNavigation}
          >
            {data.link}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-between items-end py-6">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
