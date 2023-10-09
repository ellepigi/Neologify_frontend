import React from "react";
import { useAuthValue } from "../../context/AuthContext";
import { Button } from "flowbite-react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import MyPosts from "./menuPages/MyPosts";
import Settings from "./menuPages/Settings";

export default function Profile() {
  const { currentUser, handleSignOut } = useAuthValue();
  const navigate = useNavigate();

  const SignOut = () => {
    handleSignOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <div className="sidebar flex flex-col items-center  h-100 w-64 shadow-lg">
        <img src={currentUser.photoURL} alt="#" className="my-8 rounded-full" />
        <ul className="w-full">
          <Link to="/profile">
            <li className="py-3 w-full hover:bg-gray-100 border-t border-b border-gray-200 ">
              My Posts
            </li>
          </Link>
          <Link to="/profile/settings">
            {" "}
            <li className="py-3 w-full hover:bg-gray-100 border-b border-gray-200 ">
              Settings
            </li>
          </Link>
        </ul>
        <Button className="mt-12" onClick={SignOut}>
          Logout
        </Button>
      </div>

      <Routes>
        <Route path="/" element={<MyPosts />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
