import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [dataProfile, setDataProfile] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setDataProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  function handleLogout() {
    axios
      .get("http://localhost:8000/logout", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        localStorage.removeItem("access_token");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Navbar />
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className={`w-full max-w-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg shadow`}>
          <div className="flex justify-end px-4 pt-4">
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              type="button"
            >
              <span className="sr-only">Open dropdown</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
            </button>

            <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Edit
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Export Data
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center pb-10">
            <div className="flex space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`text-sm px-5 py-2.5 rounded-full font-medium ${
                  isDarkMode ? "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-700" : "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100"
                }`}
              >
                {isDarkMode ? "Light" : "Dark"}
              </button>
            </div>
            <h5 className={`mb-1 text-xl font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{dataProfile.username}</h5>
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{dataProfile.email}</span>
            <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Dashboard
              </a>
              <a
                onClick={handleLogout}
                href="#"
                className={`py-2 px-4 ms-2 text-sm font-medium focus:outline-none rounded-lg border ${
                  isDarkMode ? "text-gray-400 bg-gray-800 border-gray-600 hover:bg-gray-700 hover:text-white dark:focus:ring-gray-700" : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100"
                }`}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
