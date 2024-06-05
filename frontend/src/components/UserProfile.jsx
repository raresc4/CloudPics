import React from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "./Header2";

const UserProfile = ({username, photoNr, dateOfLast, accountCreation}) => {
    const navigate = useNavigate();
    return (
        <>
        <Header2 />
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">{username}</h1>
            <div className="mt-4">
              <ul className="space-y-2">
                <li className="text-gray-600">
                  <span className="font-semibold">Number of photos:</span> {photoNr}
                </li>
                <li className="text-gray-600">
                  <span className="font-semibold">Date of last photo:</span> {dateOfLast}
                </li>
                <li className="text-gray-600">
                  <span className="font-semibold">Account made since:</span> {accountCreation}
                </li>
              </ul>
              <div className="mt-6 flex space-x-4 justify-center">
          <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-500 border border-red-500 transition duration-300" onClick={() => {
            if (window.confirm('Are you sure you want to delete your account?')) {
              (async () => {
                try {
                    const response = await fetch("http://localhost:4949/api/user/deleteUser", {
                        method: 'DELETE',
                        body: JSON.stringify({username}),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                const message = responseData.message;
                if(message === "User not found") {
                    alert("User not found");
                    return;
                }
                if(message === "Succes") {
                    alert("Account deleted successfully");
                    navigate('/');
                }
                } catch (error) {
                    console.error(error);
                }
              })();
            }
          }}>
            Delete account
          </button>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition duration-300" onClick={() => navigate(`/user/${username}/changePassword`)}>
            Change password
          </button>
        </div>
            </div>
          </div>
        </div>
        </>
      );
};

export default UserProfile;