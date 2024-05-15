'use client'
import React from 'react';
import Header from '../Components/Header';
import Table, {QuestionBodyInterface} from '../Components/Table';
import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function Home() {
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [tableData, setTableData] = React.useState<QuestionBodyInterface[]>();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filetype', 'raw');
            axios.post('http://localhost:5000/api/populate_table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(response.data["columns"])
                })
                .catch(error => {
                    // Handle error
                    console.error('Error uploading file:', error);
                });
        }
    };


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
                            <Table type="questions"/>
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
                                            }}>
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
