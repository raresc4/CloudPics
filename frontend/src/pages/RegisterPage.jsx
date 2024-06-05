import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}  
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    onClick={ (e) => {
                        e.preventDefault();
                        (async () => {
                            try {
                                const response = await fetch('http://localhost:4949/api/user/getUserByUsername',
                                    {
                                        method : 'POST',
                                        body : JSON.stringify({username, password}),
                                        headers: {
                                            'Content-Type': 'application/json'
                                          }   
                                    }
                                );
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                const responseData = await response.json();
                                const message = responseData.message;
                                if(message === "Missing username") {
                                    alert("Missing username");
                                    return;
                                }
                                if(message === "Missing password") {
                                    alert("Missing password");
                                    return;
                                }
                                if(message === "User already exists")
                                    {
                                        alert("User already exists");
                                        return;
                                    }
                                if (message === "Succes")
                                    {
                                        (async () => {
                                            try {
                                                const response = await fetch('http://localhost:4949/api/user/createUser',
                                                    {
                                                        method : 'POST',
                                                        body : JSON.stringify({username, password}),
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        }
                                                    }
                                                );
                                                if (!response.ok) {
                                                    throw new Error(`HTTP error! status: ${response.status}`);
                                                }
                                                const responseData = await response.json();
                                                const message = responseData.message;
                                                if (message === "User created successfully")
                                                    {
                                                        alert("User created successfully");
                                                        navigate('/login');
                                                        return;
                                                    }
                                            }
                                            catch (error) {
                                                console.error("Error:", error);
                                            }
                                    })();
                                        return;
                                    }
                            }
                            catch (error) {
                                console.error("Error:", error);
                            }
                        })();
                    }}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create account
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={() => {navigate('/login')}}>
                  Log in
                </button>
              </p>
            </div>
          </div>
        </>
      )
}