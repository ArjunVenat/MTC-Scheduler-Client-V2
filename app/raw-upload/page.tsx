import React from 'react';
import Header from '../Components/Header';
import Table from '../Components/Table';
import {Button} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Home() {
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
                                <Button variant={"contained"}
                                        size="large"
                                        startIcon={<CloudUploadIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37", // Change this to the desired hover color
                                            }
                                        }}>
                                    Upload
                                </Button>
                            </h2>
                        </div>
                        <Table type="questions"/>
                        <div className="flex flex-col items-center mt-8">
                            <h2 className="text-2xl font-sans font-semibold mb-4">
                                Upload Raw Qualtrics File Here: {' '}
                                <Button variant={"contained"}
                                        size="large"
                                        startIcon={<CloudUploadIcon/>}
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
