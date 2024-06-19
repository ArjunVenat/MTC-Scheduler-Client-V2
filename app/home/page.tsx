import React from 'react';
import Header from '../Components/Header';
import HeroPage from "@/app/Components/HeroPage";
import SendIcon from "@mui/icons-material/Send";
import {Button} from "@mui/material";

export default function Home() {
    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-200 to-gray-400 opacity-40"></div>
            <div className="relative z-10 h-full flex flex-col">
                <Header setPage={"home"}/>
                <div className="flex-grow overflow-hidden">
                    <div className="h-full overflow-y-auto items-center">
                        <HeroPage/>
                    </div>
                </div>
                <div className="flex flex-grow h-1/2">
                    <div className="w-1/2">
                        <div className="h-1/5 flex flex-col items-center justify-center bg-gray-200">
                            <h1 className="mb-4 text-xl font-sans font-bold underline text-center w-full">See the demo
                                video
                                below:</h1>
                        </div>
                        <div className="h-4/5 flex flex-col items-center justify-center bg-gray-200">
                            <iframe width="560" height="315"
                                    src="https://www.youtube.com/embed/kG3RSOagAow?si=5-7J8tByTophpFez"
                                    title="MTC Scheduler Demo"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </div>


                    <div className="w-1/2 flex items-center justify-center">
                            <a href="https://docs.google.com/document/d/119K5FxjnY7d7-OmIhbk-unVWjUCcA9-5v7rJ2cGVmds/edit?usp=sharing"
                               target="_blank"
                               rel="noopener noreferrer" className="text-blue-500 text-lg">
                                <Button variant={"contained"}
                                        size="large"
                                        endIcon={<SendIcon/>}
                                        sx={{
                                            backgroundColor: "#AC2B37", '&:hover': {
                                                backgroundColor: "#AC2B37",
                                            }
                                        }}
                                >
                                    Instructions Document
                                </Button>
                            </a>
                    </div>


                </div>
            </div>
        </div>
    );
}