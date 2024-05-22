import React from 'react'
import Image from "next/image";
import { FaHome, FaInfo, FaBriefcase } from 'react-icons/fa';
import Header from '../Components/Header';
import QuestionsTable from '../Components/Table';
import {Button, Slider} from "@mui/material";
import MinMaxTable from "@/app/Components/MinMaxTable";
import SaveIcon from "@mui/icons-material/Save";

export default function Home() {

    function handleSubmitClick(){
        const workersTable = localStorage.getItem("workersTable");
        if (workersTable) {
            const parsedData = JSON.parse(workersTable);
            console.log(parsedData);
        }
        const hoursTable = localStorage.getItem("tableState");
        if (hoursTable) {
            const parsedData = JSON.parse(hoursTable);
            console.log(parsedData);
        }
    }

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
        <div className="relative z-10 h-full flex flex-col">
            <Header setPage={"solver"}/>
            <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                <div className="mb-4">
                    <div className="flex flex-col items-center mt-8">
                        <h2 className="text-2xl font-sans font-semibold mb-4">
                            Get Assignments: {' '}
                            <Button variant={"contained"}
                                    size="large"
                                    endIcon={<SaveIcon/>}
                                    sx={{
                                        backgroundColor: "#AC2B37", '&:hover': {
                                            backgroundColor: "#AC2B37", // Change this to the desired hover color
                                        }
                                    }}
                                    onClick={handleSubmitClick}
                            >

                                Save
                            </Button>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}