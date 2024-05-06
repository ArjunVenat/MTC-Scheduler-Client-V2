import React from 'react';
export default function Header() {

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur flex-none bg-white flex justify-between items-center px-6 h-20 shadow-md">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                    <div className="relative flex items-center">
                        <div className="relative hidden lg:flex items-center ml-auto">
                            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                <ul className="flex space-x-8">
                                    <li><a className="hover:text-sky-500 dark:hover:text-sky-400"
                                           href="/docs/installation">Docs</a></li>
                                    <li><a href="https://tailwindui.com/?ref=top"
                                           className="hover:text-sky-500 dark:hover:text-sky-400">Components</a></li>
                                    <li><a className="hover:text-sky-500 dark:hover:text-sky-400" href="/blog">Blog</a>
                                    </li>
                                    <li><a className="hover:text-sky-500 dark:hover:text-sky-400"
                                           href="/showcase">Showcase</a></li>
                                    <li><a className="hover:text-sky-500 dark:hover:text-sky-400"
                                           href="/showcase">Showcase</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}