import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
// import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Login() { 
    // const [namaVariable, namafunctonuntukubahisivariable] = useState(tipedata)
    // javascript mempunyai event 
    const [inputData, setInputdata,] = useState ({
        email: '',
        password: '',
     });

    



     const [errorData, setErrorData] = useState([]);
     const navigate = useNavigate();

     function handleLogin(){
        // console.log(inputData);
        // axio 
        axios.post('http://localhost:8000/login', inputData)
        .then(res => {
            // console.log(res)
            localStorage.setItem('access_token', res.data.data.access_token);
            //then = ketika berhasil mau ngapain
            navigate('/profile')
        })
        
        .catch(err => {
            setErrorData(err.response.data)
        })
     }

     const [accountVisible, setAccountVisible] = useState(true);
    const [accountMessage, setAccountMessage] = useState("anda telah logout");

     useEffect(() => {
        const timeout = setTimeout(() => {
            setAccountVisible(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []); 
         
   
    

    return (
        <>   
        
            <Navbar />
           
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
           
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            
                            
                             {accountVisible && (
                 <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                 <span class="font-large ">{accountMessage}</span>.
                </div>
            )}
            {/* <img
                                className="mx-auto h-10 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            /> */}
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-600 dark:placeholder-gray-500"
                                            onChange={e => setInputdata({...inputData, email: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-600 dark:placeholder-gray-500"
                                            onChange={e => setInputdata({...inputData, password: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div> 
                                   
                                    <button
                                        type="button"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleLogin}
                                        >
                                        login
                                    </button>
                                   
                                </div>
                                {
                                    Object.keys(errorData).length > 0 ? (
                <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Danger</span>
  <div>
    <span class="font-medium">Gagal login</span>
      <ul class="mt-1.5 list-disc list-inside">
       
        {
          
            //looping di react mau object/array pake map
            // index : ngambil index object/array
            // value : ngambil isi satu persatu satunya
            // manggil variable pake {}
            // manggil html ()
            Object.entries(errorData).map(([index, value]) => {
                <li key={index}>{value}</li>
})
         
        }
         
     
    </ul>
  </div>
  </div> 
      ) : ''   
    }
                            </form>
                           
                           


                            {/* <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                    Start a 14 day free trial
                                </a>
                            </p> */}
                        </div>
                    </div>
                </div>
                </div>
</>
    )}