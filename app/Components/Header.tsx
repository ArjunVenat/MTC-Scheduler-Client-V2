import React from 'react'
import Image from "next/image";
import { FaHome, FaInfo, FaBriefcase } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur flex-none bg-white flex justify-between items-center px-6 h-20 shadow-md">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center space-x-20 h-full">
          <div className="flex items-center space-x-2">
            <FaHome className="text-blue-500" />
            <a href="/home" className="hover:text-blue-500">Home</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaInfo className="text-blue-500" />
            <a href="/raw-upload" className="hover:text-blue-500">Upload Raw Data</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-500" />
            <a href="/clean-upload" className="hover:text-blue-500">Upload Clean Data</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-500" />
            <a href="/params" className="hover:text-blue-500">Set Parameters</a>
          </div>
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-500" />
            <a href="/solver" className="hover:text-blue-500">Solver</a>
          </div>
        </div>
      </div>
    </header>
  );
}