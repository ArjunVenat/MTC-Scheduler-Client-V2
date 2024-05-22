'use client'
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {Button, Slider} from "@mui/material";
import MinMaxTable, {MinMaxTableState} from "@/app/Components/MinMaxTable";
import SaveIcon from "@mui/icons-material/Save";

export default function Home() {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const time = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"];

    const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Fri"]);
    const [selectedTime, setSelectedTime] = useState<string[]>(["8am", "6pm"]);

    const initialState: MinMaxTableState = {
        dayTimeMinMax: []
    };

    for (let i = 0; i < days.length; i++) {
        initialState.dayTimeMinMax[i] = [];
        for (let j = 0; j < time.length-1; j++) {
            initialState.dayTimeMinMax[i][j] = { dayTime: `${days[i]}, ${time[j]}-${time[j+1]}`, min: 0, max: 0 };
        }
    }

    const [tableState, setTableState] = useState<MinMaxTableState>(initialState);


    function handleDayChange (event: Event, newValue: number | number[]) {
        setSelectedDays((prevState) => {
            const newState = [...prevState];
            if (typeof newValue === 'number'){
                newState[0] = days[newValue];
                newState[1] = days[newValue];
                console.log(newState);
                return newState
            }
            else {
                newState[0] = days[newValue[0]];
                newState[1] = days[newValue[1]];
                console.log(newState);
                return newState;
            }
        }
        );
        console.log(selectedDays);
    }

    function handleTimeChange (event: Event, newValue: number | number[]) {
        setSelectedTime((prevState) => {
            const newState = [...prevState];
            if (typeof newValue === 'number'){
                newState[0] = time[newValue];
                newState[1] = time[newValue];
                console.log(newState);
                return newState;
            }
            else {
                newState[0] = time[newValue[0]];
                newState[1] = time[newValue[1]];
                console.log(newState);
                return newState;
            }
        });
    }

    function handleTableStateChange(newState: MinMaxTableState){
        setTableState(newState);
    }



    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
            <div className="relative z-10 h-full flex flex-col">
                <Header setPage="params" />
                <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                    <div className="mb-4">
                        <div className="flex flex-col items-center mt-8">
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Set <u>Day Range</u> Here: {' '}
                                <Slider
                                    value={selectedDays.map(day => days.indexOf(day))}
                                    onChange={handleDayChange}
                                    sx={{
                                        color: "#AC2B37",
                                    }}
                                    aria-label="Day Range Slider"
                                    marks={days.map((day, index) => ({value: index, label: day}))}
                                    min={0}
                                    max={days.length - 1}
                                    step={1}
                                    valueLabelDisplay="off"
                                />
                            </h2>
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Select the Earliest Open and Latest Close Time Here: {' '}
                                <Slider
                                    value={[time.indexOf(selectedTime[0]), time.indexOf(selectedTime[1])]}
                                    onChange={handleTimeChange}
                                    sx={{
                                        color: "#AC2B37",
                                    }}

                                    aria-label="Time Interval Slider"
                                    marks={time.map((t, index) => ({value: index, label: t}))}
                                    min={0}
                                    max={time.length - 1}
                                    step={1}
                                    valueLabelDisplay="off"
                                />
                            </h2>
                        </div>
                                <MinMaxTable startDay={selectedDays[0]} endDay={selectedDays[1]}
                                             startTime={selectedTime[0]} endTime={selectedTime[1]}
                                             tableState={tableState} defaultTableState={initialState}
                                             setTableState={handleTableStateChange}
                                />
                    </div>
                </div>
            </div>
        </div>
    );
}
