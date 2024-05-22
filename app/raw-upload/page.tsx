'use client'
import React, {useEffect} from 'react';
import Header from '../Components/Header';
import Table, {QuestionBodyInterface} from '../Components/Table';
import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import {downloadBlob} from "@/app/Functions/DownloadBlob";

export default function Home() {
    const [questionsTableData, setQuestionsTableData] = React.useState<QuestionBodyInterface[]>([]);
    const [rawFile, setRawFile] = React.useState<File | null>();

    useEffect(() => {
        const questionsTable = localStorage.getItem("questionsTable");
        if (questionsTable) {
            const parsedData = JSON.parse(questionsTable);
            console.log(parsedData);
            setQuestionsTableData(parsedData.sampleData);
        }
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            setRawFile(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filetype', 'raw');
            axios.post('http://localhost:5000/api/populate_table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    const newData = response.data["columns"];
                    const newTableData: QuestionBodyInterface[] = newData.map((item: string) => ({
                        questionText: item,
                        desiredCol: "Exclude",
                        include: true
                    }));
                    console.log(newTableData);
                    setQuestionsTableData(newTableData);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error uploading file:', error);
                });
        }
    };

    function handleSubmitClick() {
        const questionsTable = localStorage.getItem("questionsTable");
        if (questionsTable) {
            const parsedData = JSON.parse(questionsTable);
            console.log(parsedData.sampleData);
            if (rawFile && parsedData.sampleData.length > 0) {
                const formData = new FormData();
                const mapping = parsedData.sampleData.reduce((acc: QuestionBodyInterface, question: QuestionBodyInterface) => {
                    return { ...acc, [question.questionText]: question.desiredCol };
                }, {});
                console.log(mapping);
                formData.append('file', rawFile);
                formData.append('mapping', JSON.stringify(mapping));
                axios.post('http://localhost:5000/api/clean_raw', formData, {
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
        }
    }


    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
                <div className="relative z-10 h-full flex flex-col">
                    <Header setPage="raw-upload" />
                        <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                            <div className="mb-4">
                                <div className="flex flex-col items-center mt-8">
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
                            <Table type="questions" data={questionsTableData} setTableData={() => setQuestionsTableData}/>
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
