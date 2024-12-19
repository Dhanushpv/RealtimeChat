// import { Button } from '@mui/material';
// // import LoginPageLogo from '../../Images/LoginPage.jpg'
// import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png'
// import '../LoginPage/LoginPage.css'
// import { useNavigate, useLocation } from "react-router-dom";

// function SigninPage() {
//     const navigate = useNavigate();

//     const Loginpage = () => {
//         navigate (`/`)
//     };

//     return (<>

//         <div className="Login_PageContainer flex  w-full">
//             <div className=' '>

//                 <div className='static'>
//                     <div className='rounded-lg flex  justify-center items-center'>
//                         <div className='flex flex-col justify-center items-center absolute text-black  z-40'>
//                             <img src={WhisperWaveLogo} alt="" />
//                             <span className='font-serif text-4xl LoginLogo  '>Whisper Wave</span>
//                             <span className='font-serif tracking-[.25em] w-[29rem] text-center text-sm exo-2'>Message privately with friends and family using WhisperWave on your browser.</span>

//                         </div>
//                         <div className='LoginPageLogo inline-block'></div>

//                     </div>
//                 </div>
//             </div>
//             <div className='w-full flex items-center'>
//                 <form className='w-full flex justify-center items-center flex-col'>
//                     <h1 className='exo-2 text-5xl font-bold pb-2 '>Sign in  to</h1>
//                     <h1 className='exo-2 text-xl font-bold pb-2 '>Whisper Wave </h1>
//                     <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
//                         <input type="email" placeholder='Name' className='px-2 border-inherit border-0 outline-0 border-none rounded-xl border-white w-full bg-transparent' />
//                     </div>
//                     <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
//                         <input type="text" placeholder='Email' className='px-2 border-0 outline-0 border-none border-white w-full bg-transparent' />
//                     </div>
//                     <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
//                         <input type="text" placeholder='Password' className='px-2 border-0 outline-0 border-none border-white w-full bg-transparent' />
//                     </div>
//                     <div className='pt-5 text-center'>
//                         <button type='submit' class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
//                                     border-blue-600
//                                     border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
//                                     active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
//                             Sign in 
//                         </button>
//                         <p class="text-sm">Already have an account? <span onClick={Loginpage} class="Loginpage">Login</span></p>
//                     </div>
//                 </form >

//             </div>

//         </div>

//     </>)
// } export default SigninPage


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png';
import '../LoginPage/LoginPage.css';

function SigninPage() {
    const navigate = useNavigate();

    // State to hold form data and messages
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:4000/user', formData);
            console.log("Response:", response.data);

            if (response.data.success) {
                setSuccess('User registered successfully!');
                navigate('/Loginpage'); // Navigate to login or homepage
            } else {
                setError(response.data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    const Loginpage = () => {
        navigate(`/Loginpage`);
    };

    return (
        <>
        <div className='HomePage bg-slate-300 h-screen w-full m-0 flex justify-center items-center'>
        <div className="main-container  bg-slate-200    w-12/13 h-11/12 rounded-lg flex  ">
            <div className="Login_PageContainer flex w-full">
                <div className=' '>
                    <div className='static'>
                        <div className='rounded-lg flex justify-center items-center'>
                            <div className='flex flex-col justify-center items-center absolute text-black z-40'>
                                <a href=' /' ><img src={WhisperWaveLogo} alt="" /></a>
                                <span className='font-serif text-4xl LoginLogo'>Whisper Wave</span>
                                <span className='font-serif tracking-[.25em] w-[29rem] text-center text-sm exo-2'>
                                    Message privately with friends and family using WhisperWave on your browser.
                                </span>
                            </div>
                            <div className='LoginPageLogo inline-block'></div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center'>
                    <form
                        className='w-full flex justify-center items-center flex-col'
                        onSubmit={handleSubmit}
                    >
                        <h1 className='exo-2 text-5xl font-bold pb-2'>Sign in to</h1>
                        <h1 className='exo-2 text-xl font-bold pb-2'>Whisper Wave</h1>

                        <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
                            <input
                                type="text"
                                name="name"
                                placeholder='Name'
                                value={formData.name}
                                onChange={handleChange}
                                className='px-2 border-0 outline-0 w-full bg-transparent'
                            />
                        </div>

                        <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                                className='px-2 border-0 outline-0 w-full bg-transparent'
                            />
                        </div>

                        <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                                className='px-2 border-0 outline-0 w-full bg-transparent'
                            />
                        </div>

                        <div className='pt-5 text-center'>
                            <button
                                type='submit'
                                className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                            >
                                Sign in
                            </button>
                            <p className="text-sm">
                                Already have an account?{' '}
                                <span onClick={Loginpage} className="Loginpage cursor-pointer text-blue-500">
                                    Login
                                </span>
                            </p>
                        </div>

                        {/* Error and Success Messages */}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-green-500 mt-2">{success}</p>}
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default SigninPage;
