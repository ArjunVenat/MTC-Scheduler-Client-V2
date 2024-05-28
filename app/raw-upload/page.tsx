'use client'
import React from 'react';
import Header from '../Components/Header';
import Table, {QuestionBodyInterface, WorkersBodyInterface} from '../Components/Table';
import {Alert, Button, Snackbar} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {downloadBlob} from "@/app/Functions/DownloadBlob";

export default function Home() {
    const [questionsTableData, setQuestionsTableData] = React.useState<QuestionBodyInterface[]>([]);
    const [rawFile, setRawFile] = React.useState<File | null>();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const comparisonSet = new Set(["Name", "Position", "Courses", "Max-hours", "Back-to-Back"]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setRawFile(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filetype', 'raw');
            axios.post('http://mtc-scheduler.wpi.edu/api/populate_table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    const newData = response.data["columns"];
                    const newTableData: QuestionBodyInterface[] = newData.map((item: string) => ({
                        questionText: item,
                        desiredCol: "Exclude",
                    }));
                    console.log(newTableData);
                    setQuestionsTableData(newTableData);
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    function areSetsEqual(setA: Set<string>, setB: Set<string>) { //Why is this not built into JS?
        if (setA.size !== setB.size) return false;
        const arrA = Array.from(setA).sort();
        const arrB = Array.from(setB).sort();
        for (let i = 0; i < arrA.length; i++) {
            if (arrA[i] !== arrB[i]) {
                return false;
            }
        }
        return true;
    }

    function handleSubmitClick() {
        if (rawFile && questionsTableData) {
            const check = questionsTableData.map((item) => item.desiredCol);
            const checkNoExclude = check.filter((item) => item !== "Exclude");
            const checkNoExcludeSet = new Set(checkNoExclude);

            if (areSetsEqual(checkNoExcludeSet, comparisonSet)) {
                setSnackbarOpen(false);
                const formData = new FormData();
                formData.append('file', rawFile);
                formData.append('mapping', JSON.stringify(questionsTableData));
                axios.post('http://mtc-scheduler.wpi.edu/api/clean_raw', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'blob',
                }).then(response => {
                    const blob = response.data;
                    downloadBlob(blob, 'cleaned-responses.xlsx');
                })
                    .catch(error => {
                        // Handle error
                        console.error('Error uploading file:', error);
                    });
            }
            else {
                setSnackbarOpen(true);
            }
        }
    }

    function handleTableChange(newState: WorkersBodyInterface[] | QuestionBodyInterface[]) {
        if (Array.isArray(newState) && newState) {
            setQuestionsTableData(newState as QuestionBodyInterface[]);
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
                    <Header setPage="raw-upload" />
                        <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                            <div className="mb-4">
                                <div className="flex flex-col items-center mt-8">
                                    <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                        <Alert
                                            severity="error"
                                            variant="filled"
                                            sx={{ width: '100%' }}
                                        >
                                            Exactly one of each label must be used, save for {"Exclude"}, which can be used any number of times.
                                        </Alert>
                                    </Snackbar>
                                    <h2 className="text-2xl font-sans font-semibold mb-4">
                                        Upload <u>Raw Qualtrics</u> File Here: {' '}
                                        <label htmlFor="raw-qualtrics-file">
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
                                            style={{display: 'none'}}
                                            id="raw-qualtrics-file"
                                            type="file"
                                            onChange={handleFileSelect}
                                        />
                                    </h2>
                                </div>
                            <Table type="questions" data={questionsTableData} setTableData={handleTableChange}/>
                            <div className="flex flex-col items-center mt-8">
                                <h2 className="text-2xl font-sans font-semibold mb-4">
                                Submit Choices To Get Clean Data: {' '}
                                <Button variant={"contained"}
                                        size="large"
                                        endIcon={<SendIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37", // Change this to the desired hover color
                                                }
                                            }}
                                        onClick={handleSubmitClick}
                                >
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
