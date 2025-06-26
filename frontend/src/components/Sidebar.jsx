import React from "react";
import { BsHouseFill, BsSearch, BsSearchHeart, BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="h-screen bg-gray-300 rounded-r-md">
        <div className="px-2 py-4 flex flex-col items-center mt-[100px]">
            <ul className="space-y-2 font-medium">
                <li>
                    <Link
                    to=""
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100"
                    >
                    <BsHouseFill />
                    <span className="ms-3">Home</span>
                    </Link>
                </li>
                <li>
                    <Link
                    to=""
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100"
                    >
                    <BsSearch />
                    <span className="ms-3">Search</span>
                    </Link>
                </li>
                <li>
                    <Link
                    to=""
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100"
                    >
                    <BsSearchHeart />
                    <span className="ms-3">Explore</span>
                    </Link>
                </li>
                <li>
                    <Link
                    to=""
                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100"
                    >
                    <BsPersonFill />
                    <span className="ms-3">Profile</span>
                    </Link>
                </li>
            </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
