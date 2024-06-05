import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Change Password</h1>
        <form className="mt-4" action='#' method='POST'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-password">
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              value={passwordOld}
              onChange={(e) => setPasswordOld(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => {e.preventDefault();
                if (passwordNew !== confirmPassword) {
                  alert('Passwords do not match');
                  return;
                }
                if (!passwordNew || !confirmPassword || !passwordOld) {
                    alert('Password cannot be empty');
                    return;
                }
                (async () => {
                    try {
                        const response = await fetch('http://localhost:4949/api/user/changePassword', {
                            method : 'PUT',
                            body : JSON.stringify({username, passwordOld, passwordNew}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if(!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const responseData = await response.json();
                        const message = responseData.message;
                        console.log(message);
                        if (message === 'Invalid old password') {
                            alert('Invalid old password');
                            return;
                        }
                        if (message === 'Succes') {
                            alert('Password changed successfully');
                            navigate(`/user/${username}`);
                            return;
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                })();}}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition duration-300"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
