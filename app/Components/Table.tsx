'use client'
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { Tooltip } from "@mui/material";
import {Checkbox, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material";

interface TableInterface {
  type: "questions" | "workers";
  data?: QuestionBodyInterface[] | WorkersBodyInterface[];
  setTableData: (data: QuestionBodyInterface[] | WorkersBodyInterface[]) => void;
}

export interface QuestionBodyInterface {
  questionText: string;
  desiredCol: string;
  include: boolean;
}

export interface WorkersBodyInterface {
    name: string,
    position: string
    creditScore: number,
    prioritize: boolean
}

interface RowEditFlag {
    row: number,
    currentState: string,
    isEditing: boolean
}

export default function Table(props: TableInterface) {
    const headers: string[] = props.type === "questions" ? ["Desired Output Column Name", "Include in Model"] : ["Name", "Position", "Social Credit Score", "Prioritize?"];

    const [sampleData, setSampleData] = useState<QuestionBodyInterface[]>([
        {questionText: "\"Name\"", desiredCol: "\"Name\"", include: true},
        {questionText: "\"Select Your Position\"", desiredCol: "\"Position\"", include: true},
        {questionText: "\"Which of the following courses do feel qualified to help with\"", desiredCol: "\"Qualifications\"", include: false}
    ]);

    const [sampleData2, setSampleData2] = useState<WorkersBodyInterface[]>(
        [
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true}]
    )

    function handleInputChange (row: number, value: string) {
        console.log(value);
        setRowEditFlag((currentState) => {
            const updatedData = [...currentState];
            updatedData[row].currentState = value;
            return updatedData;
        });
    }

    const initialState: RowEditFlag[] = sampleData.map((_, i) => ({ row: i, isEditing: false, currentState: sampleData[i].desiredCol }));
    const [rowEditFlag, setRowEditFlag] = useState<RowEditFlag[]>(initialState);

    function handleEditClick(row: number) {
        setRowEditFlag((currentState: RowEditFlag[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], isEditing: true };
            return newState;
        });
    }

    function handleSaveClick(row: number){
        console.log(rowEditFlag[row].currentState);
        setSampleData((currentState: QuestionBodyInterface[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], desiredCol: rowEditFlag[row].currentState}
            return newState;
        }
        )

        setRowEditFlag((currentState: RowEditFlag[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], isEditing: false};
            return newState;
        })
    }

    function handleDeleteClick(row: number){
        setRowEditFlag((currentState: RowEditFlag[]) => {
            const newState = [...currentState];
            newState[row] = { ...newState[row], isEditing: false, currentState: sampleData[row].desiredCol };
            return newState;
        });
    }

    const handleRadioChange = (row: number, value: number) => {
        setSampleData2((currentState) => {
            const newState = [...currentState];
                newState[row] = { ...newState[row], creditScore: value};
                return newState;
            });
    };


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="p-8 overflow-y px-0">
                <table className="w-full min-w-max table-auto text-left">
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
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-lg leading-normal text-blue-gray-900 font-normal whitespace-normal">{row.questionText}</p>
                                </div>
                            </td>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex justify-between items-center gap-3">
                                    {!rowEditFlag[i].isEditing && (<p className="block antialiased font-sans text-lg leading-normal text-blue-gray-900 font-normal">{row.desiredCol}</p>)}
                                    {rowEditFlag[i].isEditing && (<TextField
                                        variant="standard"
                                        value={rowEditFlag[i].isEditing ? rowEditFlag[i].currentState : sampleData[i].desiredCol}
                                        onChange={(e) => handleInputChange(i, e.target.value)}
                                        sx={{
                                            '& .MuiInput-underline:after': { borderBottomColor: '#AC2B37' },
                                        }}
                                    />)}
                                    <div>
                                        {rowEditFlag[i].isEditing && (
                                            <Tooltip title={"Save"} arrow>
                                                <button className="p-3 hover:bg-slate-200/70 rounded-xl" onClick={(e) => handleSaveClick(i)}><SaveIcon/>
                                                </button>
                                            </Tooltip>
                                        )}
                                        {rowEditFlag[i].isEditing && (
                                            <Tooltip title={"Undo"} arrow>
                                                <button
                                                    className="p-3 hover:bg-slate-200/70 rounded-xl" onClick={(e) => handleDeleteClick(i)}><UndoIcon/>
                                                </button>
                                            </Tooltip>
                                        )}

                                    </div>
                                    {!rowEditFlag[i].isEditing && (
                                        <Tooltip title={"Edit"}>
                                            <button className="p-3 hover:bg-slate-200/70 rounded-xl"
                                                  onClick={(e) => handleEditClick(i)}><EditIcon/>
                                            </button>
                                        </Tooltip>
                                    )}
                                </div>
                            </td>
                            <td className="p-8 border-b border-blue-gray-50">
                                <div className="flex justify-between items-center gap-3">
                                    <Checkbox sx={{color: 'black', '&.Mui-checked': {
                                            color: "#AC2B37",
                                        }}} />
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
                                                sx={{color: 'gray', '&.Mui-checked': {
                                                        color: "#AC2B37",
                                                    }}}
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
                                    <Checkbox sx={{color: 'black', '&.Mui-checked': {
                                            color: "#AC2B37",
                                        }}} />
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

