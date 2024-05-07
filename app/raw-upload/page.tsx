import React from 'react'
import Image from "next/image";
import { FaHome, FaInfo, FaBriefcase } from 'react-icons/fa';
import Header from '../Components/Header';
import LargeTable from '../Components/LargeTable';

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
      <div className="relative z-10 h-full flex flex-col">
          <Header setPage={"raw-upload"}/>
        <div className="flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto">
            <LargeTable />
          </div>
        </div>
      </div>
    </div>
  );
}