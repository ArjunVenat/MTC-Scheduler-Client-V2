'use client'
import React, {useState} from 'react';
import Header from '../Components/Header';
import Table, {QuestionBodyInterface, WorkersBodyInterface} from '../Components/Table';
import {Alert, Button, Snackbar} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from '@mui/icons-material/Send';
import {downloadBlob} from "@/app/Functions/DownloadBlob";

export default function Home() {
    const [workersTableData, setWorkersTableData] = useState<WorkersBodyInterface[]>([]);
    const [cleanFile, setCleanFile] = useState<File | null>();
    const [isInfeasible, setIsInfeasible] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>("Success");
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    function handleFileSelect (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setCleanFile(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filetype', 'clean');
            axios.post('http://mtc-scheduler.wpi.edu/api/populate_table', formData, {
                    // mtc-scheduler.wpi.edu
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
            }).then(response => {
                        console.log('File uploaded successfully:', response.data);
                        const res = response.data
                        const workersData = Object.keys(res.Name).map((key) => ({
                            name: res.Name[key],
                            position: res.Position[key],
                            creditScore: res.social_credit_score[key],
                            prioritize: res["prioritized?"][key] === 'Yes'
                        }));
                        setWorkersTableData(workersData)
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error uploading file:', error);
                    });
            }
    }

    function handleRecleanClick(){
        if (cleanFile && workersTableData){
            const formData = new FormData();
            formData.append('file', cleanFile);
            formData.append('parameterTableOutput', JSON.stringify(workersTableData));
            axios.post('http://mtc-scheduler.wpi.edu/api/reclean', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            }).then(response => {
                const blob = response.data;
                downloadBlob(blob, 'recleaned-responses.xlsx');
            }).catch(error => {
                console.error('Error uploading file:', error);
            })
        }
    }

    function handleSubmitClick() {
        if (cleanFile && workersTableData) {
            const hoursTable = localStorage.getItem('hoursTable');
            const daysRange = localStorage.getItem('dayRange');
            const timeRange = localStorage.getItem("timeRange");
            if (hoursTable && daysRange && timeRange){
                const formData = new FormData();
                formData.append('file', cleanFile);
                formData.append('parameterTableOutput', JSON.stringify(workersTableData));
                formData.append('hoursTable', hoursTable);
                formData.append("dayRange", daysRange);
                formData.append("timeRange", timeRange);

                axios.post('http://mtc-scheduler.wpi.edu/api/feasibility_check', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(response => {
                    console.log(response);
                    setSnackbarMsg(response.data["message"]);
                    setIsInfeasible(response.data["statusFlag"]);
                    setSnackbarOpen(true);

                    if (response.data["statusFlag"] === true){
                        axios.post('http://mtc-scheduler.wpi.edu/api/get_solution', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            responseType: 'blob',
                        }).then(response => {
                            const blob = response.data;
                            downloadBlob(blob, 'shift-assignments.xlsx');
                        }).catch(error => {
                            console.error('Error uploading file:', error);
                        });
                    }
                }).catch(error => {
                    console.error('Error uploading file:', error);
                })



            }
        }
    }

    function handleTableChange(newState: WorkersBodyInterface[] | QuestionBodyInterface[]) {
        if (Array.isArray(newState) && newState) {
            setWorkersTableData(newState as WorkersBodyInterface[]);
        }
    }

    function handleSnackbarClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }


    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
            <div className="relative z-10 h-full flex flex-col">
                <Header setPage="clean-upload" />
                <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                    <div className="mb-4">
                        <div className="flex flex-col items-center mt-8">
                            <Snackbar open={snackbarOpen} autoHideDuration={isInfeasible ? 5000: 3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                <Alert
                                    severity={isInfeasible ? "error": "success"}
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {snackbarMsg}
                                </Alert>
                            </Snackbar>
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Upload <u>Clean Data</u> File Here: {' '}
                                <label htmlFor="clean-file">
                                    <Button variant={"contained"}
                                            size="large"
                                            startIcon={<CloudUploadIcon/>}
                                            sx={{
                                                backgroundColor: "#AC2B37", '&:hover': {
                                                    backgroundColor: "#AC2B37",
                                                }
                                            }}
                                            component="span"
                                    >
                                        Upload
                                    </Button>
                                </label>
                                <input
                                    accept=".xlsx"
                                    style={{display: 'none'}}
                                    id="clean-file"
                                    type="file"
                                    onChange={handleFileSelect}
                                />
                            </h2>
                        </div>
                        <Table type="workers" data={workersTableData} setTableData={handleTableChange}/>
                        <div className="flex flex-col flex-grow items-center mt-8">
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Re-Clean Data: {' '} <span>
                                <Button variant={"contained"}
                                        size="large"
                                        endIcon={<SaveIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37",
                                            }
                                        }}
                                        onClick={handleRecleanClick}>
                                    Save
                                </Button>
                                </span> or Click Submit to Solve: {' '}
                                <Button variant={"contained"}
                                        size="large"
                                        endIcon={<SendIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37",
                                            }
                                        }}
                                        onClick={handleSubmitClick}>
                                    Submit
                                </Button>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
