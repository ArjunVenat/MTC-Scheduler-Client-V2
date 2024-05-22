'use client'
import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";


interface MinMaxTableProps {
    startDay: string;
    endDay: string;
    startTime: string;
    endTime: string;
    tableState: MinMaxTableState;
    setTableState: (current: MinMaxTableState) => void;
}

export interface MinMaxTableState {
    dayTimeMinMax: Array<Array<{dayTime: string, min: number, max: number}>>
}

export default function MinMaxTable(props: MinMaxTableProps){
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const time = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];

    const daySplice: string[] = days.slice(days.indexOf(props.startDay), days.indexOf(props.endDay)+1);
    const timeSplice: string[] = time.slice(time.indexOf(props.startTime), time.indexOf(props.endTime)+1);

    daySplice.unshift("");

    const [tableData, setTableData] = useState<MinMaxTableState>(() => {
        const storedData = localStorage.getItem("hoursTable");
        return storedData ? JSON.parse(storedData) : [];
    });

    function handleMinMaxChange(day: number, time: number, newNum: number, type: "min" | "max") {
        const newState = tableData.dayTimeMinMax.map((dayArray, i) => {
            if (i === day) {
                return dayArray.map((timeObject, j) => {
                    if (j === time) {
                        console.log(`Updating ${type} for day ${day} and time ${time} to ${newNum}`);
                        return {
                            ...timeObject,
                            [type]: newNum
                        };
                    }
                    return timeObject;
                });
            }
            return dayArray;
        });
        console.log('New state:', newState);
        setTableData({ dayTimeMinMax: newState });
        localStorage.setItem("hoursTable", JSON.stringify({ dayTimeMinMax: newState }));
    }

    function handleSubmitClick() {
        const fileBlob = localStorage.getItem("cleanFile");

        if (fileBlob) {
            // Create a File object from the Blob
            const fileName = "cleanFile.xlsx"; // You can specify the file name
            const file = new File([JSON.parse(fileBlob)], fileName, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            // Create FormData and append file and other data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('hoursTable', JSON.stringify(tableData));
            formData.append('daySplice', daySplice.join(","));
            formData.append('timeSplice', timeSplice.join(","));

            console.log('Submitting form data:', formData);

            axios.post('http://localhost:5000/api/get_solution', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    console.log('Response:', response.data);
                    // Handle response if needed
                })
                .catch(error => {
                    console.error('Error submitting form data:', error);
                    // Handle error if needed
                });
        }
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-8 overflow-y px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead className="top-0">
                    <tr>
                        {daySplice.map((header, i) => (
                            <th key={i} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-8">
                                <p className="block antialiased text-lg font-sans font-semibold leading-none">{header}</p>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {timeSplice.slice(0, -1).map((timeInterval, timeIndex) => (
                        <tr key={timeIndex}>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    {timeSplice[timeIndex + 1] && (
                                        <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-semibold">{timeInterval}-{timeSplice[timeIndex + 1]}</p>
                                    )}
                                </div>
                            </td>
                            {daySplice.slice(1).map((dayRow, dayIndex) => (
                                <td key={dayIndex} className="p-8 border-b border-blue-gray-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            className="w-10 h-8 bg-transparent border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            type="number"
                                            min="0"
                                            max="9"
                                            value={tableData.dayTimeMinMax[days.indexOf(daySplice[dayIndex + 1])][time.indexOf(timeInterval)].min}
                                            onChange={(e) => handleMinMaxChange(days.indexOf(daySplice[dayIndex + 1]), time.indexOf(timeInterval), e.target.valueAsNumber, "min")}
                                        />
                                        <input
                                            className="w-10 h-8 bg-transparent border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            type="number"
                                            min="0"
                                            max="9"
                                            value={tableData.dayTimeMinMax[days.indexOf(daySplice[dayIndex + 1])][time.indexOf(timeInterval)].max}
                                            onChange={(e) => handleMinMaxChange(days.indexOf(daySplice[dayIndex + 1]), time.indexOf(timeInterval), e.target.valueAsNumber, "max")}
                                        />
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="flex flex-col items-center mt-8">
                    <h2 className="text-2xl font-sans font-semibold mb-4">
                        Save Min and Max Choices: {' '}
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
    );
}