import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [userAuth, setUserAuth] = useState({});

  const [isLogout, setIsLogout] = useState();

  const navigate = useNavigate();

    useEffect(() => {
    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserAuth(res.data.data);
        setIsLogin(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);


  

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link to="/">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>
            <Link to="/" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Home
            </Link>
          </a>

          {isLogin && (
            <div className="flex-grow flex justify-center">
              <ul className="flex space-x-8 font-medium">
                {userAuth.role === "admin" ? (
                  <>
                    <li>
                      <Link
                        to="/stuffs"
                        className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                      >
                        Stuff
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/inbound"
                        className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                      >
                        Inbound
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/lending"
                        className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                      >
                        Lending
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user"
                        className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                      >
                        User
                      </Link>
                    </li>
                   
                  </>
                ) : userAuth.role === "staff" ? (
                  <li>
                    <Link
                      to="/lending"
                      className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500"
                    >
                      Lending
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Link to="/profile" className="text-gray-900 dark:text-white">
                Profile
              </Link>
            </div>
          )}
         
         {isLogout && (
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Link to="/profile" className="text-gray-900 dark:text-white">
                Profile
              </Link>
            </div>
          )}

        </div>
      </nav>
    </>
  );
}
