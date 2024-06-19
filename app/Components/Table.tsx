'use client'
import React, {useEffect, useState} from "react";
import {Checkbox, TextField, RadioGroup, FormControlLabel, Radio, Autocomplete} from "@mui/material";

interface TableInterface {
  type: "questions" | "workers";
  data: QuestionBodyInterface[] | WorkersBodyInterface[];
  setTableData: (newState: WorkersBodyInterface[] | QuestionBodyInterface[]) => void;
}


export interface QuestionBodyInterface {
  questionText: string;
  desiredCol: string;
}

export interface WorkersBodyInterface {
    name: string,
    position: string
    creditScore: number,
    prioritize: boolean
}

export default function Table(props: TableInterface) {
    const headers: string[] = props.type === "questions" ? ["Question Text", "Desired Output Column Name"] : ["Name", "Position", "Social Credit Score", "Prioritize?"];
    const { type, data } = props;
    const autocompleteChoices = ["Name", "Position", "Courses", "Max-hours", "Back-to-Back", "Exclude"];

    const [sampleData, setSampleData] = useState<QuestionBodyInterface[]>([]);

    const [sampleData2, setSampleData2] = useState<WorkersBodyInterface[]>([]);

    useEffect(() => {
        if (type === "questions" && Array.isArray(data) && data.every((item) => "questionText" in item)) {
            // console.log(data);
            setSampleData(data as QuestionBodyInterface[]);
            props.setTableData(data as QuestionBodyInterface[]);
        } else if (type === "workers" && Array.isArray(data) && data.every((item) => "name" in item)) {
            // console.log(data);
            setSampleData2(data as WorkersBodyInterface[]);
            props.setTableData(data as WorkersBodyInterface[]);
        }
        // console.log(sampleData);
    }, [type, data]);

    useEffect(() => {
        localStorage.setItem("questionsTable", JSON.stringify({ type, sampleData }));
        // console.log(sampleData);
    }, [type, sampleData]);


    function handleInputChange(row: number, value: string) {
        setSampleData((currentState: QuestionBodyInterface[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], desiredCol: value || "Exclude" };
            props.setTableData(newState);
            return newState;
        });
    }

    const handleRadioChange = (row: number, value: number) => {
        setSampleData2((currentState: WorkersBodyInterface[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], creditScore: value };
            // console.log(newState);
            props.setTableData(newState);
            return newState;
        });
    };

    const handleCheckboxChange = (row: number, checked: boolean) => {
        setSampleData2((currentState: WorkersBodyInterface[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], prioritize: checked };
            // console.log(newState);
            props.setTableData(newState);
            return newState;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-8 overflow-x-auto max-w-full">
                <table className="w-full table-auto text-left">
                    <thead className="top-0">
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-8">
                                {/*WPI Crimson is #AC2B37*/}
                                <p className="block antialiased text-2xl font-sans font-semibold leading-none">{header}</p>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.type === "questions" && sampleData && (sampleData.map((row, i) => (
                        <tr key={i}>
                            {/*<td className="p-8 border-b border-blue-gray-50">*/}
                            {/*    <div className="flex items-center gap-3">*/}
                            {/*        <p className="block antialiased font-sans text-lg leading-normal text-blue-gray-900 font-normal">{row.dataCollected}</p>*/}
                            {/*    </div>*/}
                            {/*</td>*/}
                            <td className="border border-blue-gray-100 p-3 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <p className="text-base sm:text-lg font-normal">{row.questionText}</p>
                                </div>
                            </td>
                            <td className="border border-blue-gray-100 p-3 sm:p-6">
                                <div className="flex justify-between items-center gap-3">
                                    <Autocomplete
                                        disablePortal
                                        options={autocompleteChoices}
                                        value={row.desiredCol}
                                        onChange={(event, newValue) => handleInputChange(i, newValue || "")}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Select Most Appropriate Label" />}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option}>
                                                {option}
                                            </li>
                                        )}
                                    />
                                </div>
                            </td>
                        </tr>
                    )))}

                    {props.type === "workers" && sampleData2 && (sampleData2.map((row, i) => (
                        <tr key={i}>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-lg leading-normal text-blue-gray-900 font-normal">{row.name}</p>
                                </div>
                            </td>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-lg leading-normal text-blue-gray-900 font-normal whitespace-normal">{row.position}</p>
                                </div>
                            </td>
                            <td className="border-b border-blue-gray-50">
                                <RadioGroup row={true}>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FormControlLabel
                                            key={value}
                                            value={value.toString()}
                                            control={
                                                <Radio
                                                    checked={sampleData2[i].creditScore === value}
                                                    onClick={(e) => handleRadioChange(i, value)}
                                                    sx={{
                                                        color: 'gray', '&.Mui-checked': {
                                                            color: "#AC2B37",
                                                        }
                                                    }}
                                                />
                                            }
                                            label={value.toString()}
                                            labelPlacement="top"
                                        />
                                    ))}
                                </RadioGroup>
                            </td>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex justify-between items-center gap-3">
                                    <Checkbox sx={{
                                        color: 'black', '&.Mui-checked': {
                                            color: "#AC2B37",
                                        }
                                    }}
                                              checked={row.prioritize}
                                              onChange={(e) => handleCheckboxChange(i, e.target.checked)}
                                    />
                                </div>
                            </td>
                        </tr>
                    )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

