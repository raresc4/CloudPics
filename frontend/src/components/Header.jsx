import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  InputPhoto  from "./InputPhoto";

export default function Header() {
    const { username } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="#" className="flex items-center">                
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CloudPics</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {
                                (async () => {
                                    await fetch('http://localhost:4949/api/jwt/logout', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        credentials: 'include'
                                    });
                                })();
                                navigate('/login')
                                }}>Log out</button>
                            <InputPhoto />
                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {navigate(`/user/${username}/profile`)}}>My profile</button>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <header className="flex justify-center items-center py-4 bg-gray-800 text-white font-bold text-xl">
                                {username}'s photos
                            </header>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}