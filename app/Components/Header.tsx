import React from 'react';

interface HeaderProps {
    setPage: "home" | "raw-upload" | "clean-upload" | "params" | "solver"
}
export default function Header(props: HeaderProps) {

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur flex-none bg-white flex justify-between items-center px-6 h-20 shadow-md">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                    <div className="relative flex items-center">
                        <div className="relative hidden lg:flex items-center ml-auto">
                            <nav className="text-lg leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                <ul className="flex space-x-8">
                                    <li>
                                        <a className={`p-3 hover:bg-slate-200/50 ${props.setPage === "home" ? "bg-slate-200/50": ""} rounded-full dark:hover:text-sky-400`}
                                           href="/home">Home
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`p-3 hover:bg-slate-200/50 ${props.setPage === "raw-upload" ? "bg-slate-200/50": ""} rounded-full dark:hover:text-sky-400"`}
                                           href="/raw-upload">Upload Raw Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`p-3 hover:bg-slate-200/50 ${props.setPage === "clean-upload" ? "bg-slate-200/50": ""} rounded-full dark:hover:text-sky-400`}
                                           href="/clean-upload">Upload Clean Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`p-3 hover:bg-slate-200/50 ${props.setPage === "params" ? "bg-slate-200/50": ""} rounded-full dark:hover:text-sky-400`}
                                           href="/params">Set Parameters
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`p-3 hover:bg-slate-200/50 ${props.setPage === "solver" ? "bg-slate-200/50": ""} rounded-full dark:hover:text-sky-400`}
                                           href="/solver">Solver
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}