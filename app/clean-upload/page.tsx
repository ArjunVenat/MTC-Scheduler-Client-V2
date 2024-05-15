'use client'
import React, {useState} from 'react';
import Header from '../Components/Header';
import Table from '../Components/Table';
import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function Home() {
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('filetype', 'clean');
            axios.post('http://localhost:5000/api/populate_table', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // Handle success
                    console.log('File uploaded successfully:', response.data);
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
                <Header setPage="clean-upload" />
                <div className="h-full overflow-y-auto flex flex-col items-center mt-8">
                    <div className="mb-4">
                        <div className="flex flex-col items-center mt-8">
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
                        <Table type="workers"/>
                        <div className="flex flex-col items-center mt-8">
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Submit Choices to Re-Clean Data: {' '}
                                <Button variant={"contained"}
                                        size="large"
                                        endIcon={<SendIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37", // Change this to the desired hover color
                                            }
                                        }}>
                                    Upload
                                </Button>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
