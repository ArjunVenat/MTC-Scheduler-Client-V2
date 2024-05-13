'use client'
import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material";

interface TableInterface {
  type: "questions" | "workers";
  data?: QuestionBodyInterface[] | WorkersBodyInterface[]
}

interface QuestionBodyInterface {
  dataCollected: string;
  questionText: string;
  desiredCol: string;
  include: boolean;
}

interface WorkersBodyInterface {
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
    const headers: string[] = props.type === "questions" ? ["Data Collected", "Question Text", "Desired Output Column Name", "Include in Model"] : ["Name", "Position", "Social Credit Score", "Prioritize?"];

    const [sampleData, setSampleData] = useState<QuestionBodyInterface[]>([
        {dataCollected: "Name", questionText: "\"Name\"", desiredCol: "\"Name\"", include: true},
        {dataCollected: "Position", questionText: "\"Select Your Position\"", desiredCol: "\"Position\"", include: true},
        {dataCollected: "Ability", questionText: "\"Which of the following courses do feel qualified to help with\"", desiredCol: "\"Qualifications\"", include: false}
    ]);

    const [sampleData2, setSampleData2] = useState<WorkersBodyInterface[]>(
        [
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
            {name: "Arjun Venat", position: "PLA", creditScore: 3, prioritize: true},
        ]
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
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="p-6 overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                {/*WPI Crimson is #AC2B37*/}
                                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-bold leading-none opacity-70">{header}</p>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.type === "questions" && sampleData && (sampleData.map((row, i) => (
                        <tr key={i}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal">{row.dataCollected}</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal whitespace-normal">{row.questionText}</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex justify-between items-center gap-3">
                                    {!rowEditFlag[i].isEditing && (<p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal">{row.desiredCol}</p>)}
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
                                            <button className="p-3 hover:bg-slate-200/70 rounded-xl" onClick={(e) => handleSaveClick(i)}><SaveIcon/>
                                            </button>)}
                                        {rowEditFlag[i].isEditing && (
                                            <button className="p-3 hover:bg-slate-200/70 rounded-xl" onClick={(e) => handleDeleteClick(i)}><DeleteIcon/></button>)}
                                    </div>
                                    {!rowEditFlag[i].isEditing && (<button className="p-3 hover:bg-slate-200/70 rounded-xl"
                                              onClick={(e) => handleEditClick(i)}><EditIcon/></button>)}
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
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
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal">{row.name}</p>
                                </div>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <p className="block antialiased font-sans text-md leading-normal text-blue-gray-900 font-normal whitespace-normal">{row.position}</p>
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
                            <td className="pl-1 pt-4 pb-4 border-b border-blue-gray-50">
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
// <td className="p-4 border-b border-blue-gray-50">
//               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">$2,500</p>
//             </td>
//             <td className="p-4 border-b border-blue-gray-50">
//               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Wed
  //                 3:00pm</p>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //             <div className="w-max">
  //                 <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
  //                   <span className="">paid</span>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="flex items-center gap-3">
  //                 <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
  //                   <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png" alt="visa" className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"/>
  //                 </div>
  //                 <div className="flex flex-col">
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">visa 1234</p>
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">06/2026</p>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
  //                 <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
  //                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
  //                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
  //                   </svg>
  //                 </span>
  //               </button>
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="flex items-center gap-3">
  //                 <img src="https://docs.material-tailwind.com/img/logos/logo-amazon.svg" alt="Amazon" className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"/>
  //                 <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Amazon</p>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">$5,000</p>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Wed 1:00pm</p>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="w-max">
  //                 <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
  //                   <span className="">paid</span>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="flex items-center gap-3">
  //                 <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
  //                   <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png" alt="master-card" className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"/>
  //                 </div>
  //                 <div className="flex flex-col">
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">master card 1234</p>
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">06/2026</p>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
  //                 <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
  //                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
  //                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
  //                   </svg>
  //                 </span>
  //               </button>
  //             </td>
  //           </tr>
  //           <tr>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="flex items-center gap-3">
  //                 <img src="https://docs.material-tailwind.com/img/logos/logo-pinterest.svg" alt="Pinterest" className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"/>
  //                 <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">Pinterest</p>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">$3,400</p>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Mon 7:40pm</p>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="w-max">
  //                 <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-amber-500/20 text-amber-900 py-1 px-2 text-xs rounded-md">
  //                   <span className="">pending</span>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <div className="flex items-center gap-3">
  //                 <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
  //                   <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png" alt="master-card" className="inline-block relative object-center !rounded-none rounded-md h-full w-full object-contain p-1"/>
  //                 </div>
  //                 <div className="flex flex-col">
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">master card 1234</p>
  //                   <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">06/2026</p>
  //                 </div>
  //               </div>
  //             </td>
  //             <td className="p-4 border-b border-blue-gray-50">
  //               <button className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
  //                 <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
  //                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
  //                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
  //                   </svg>
  //                 </span>
  //               </button>
  //             </td>
  //           </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>

