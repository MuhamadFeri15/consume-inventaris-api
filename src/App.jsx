import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// import Case from "./components/Case"
// import Navbar from './Navbar'

// import chisNolan from './assets/chis-nolan.jpg';


import React from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';


const App = () => {
    return (
        <>
            <Navbar />
           
            {/* <div className='flex items-center justify-center min-h-screen bg-gray-900'>
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="./assets/chis-nolan.jpg" alt="Christopher Nolan" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
            </a>
        </div> */}
        <Card />

        </>
    );
};

export default App;



