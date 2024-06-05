import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Header2() {
    const navigate = useNavigate();
    const { username } = useParams();
    return (
    <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="#" className="flex items-center">                
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CloudPics</span>
                        </a>
                        <div className="flex items-center lg:order-2">
                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {navigate('/login')}}>Log out</button>
                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {navigate(`/user/${username}/profile`)}}>My profile</button>
                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => {navigate(`/user/${username}`)}}>My photos</button>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}