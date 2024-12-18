
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png';
import '../LoginPage/LoginPage.css';

function LoginPage() {
    const navigate = useNavigate();
 

    // State to manage form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handler to navigate to the signup page
    const goToSignupPage = () => {
        navigate('/SigninPage');
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        try {
            const response = await axios.post('http://localhost:4000/login', {
                email,
                password,
            });
            console.log("response",response)

            if (response.data.success) {
                // const { token, user_type } = response.data.data;

                // console.log('Login successful:', response.data);

                let token_data = response.data.data;
                let usertype = token_data.user_type.usertypes;
                let token = token_data.token;
                let id = token_data.id;
                let token_key = id;
    
                // Store data in localStorage
                localStorage.setItem(token_key, token);
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userType', usertype);
    

                // Navigate to Admin or User dashboard based on user_type
                if (usertype === 'Admin') {
                    navigate(`/admin-dashboard?login=${token_key}&id=${id}`); // Admin Dashboard Route
                } else if (usertype === 'Users') {
                    navigate(`/Maincontainer?login=${token_key}&id=${id}`); // User Dashboard Route
                } else {
                    setErrorMessage('Invalid user type.');
                }
            } else {
                setErrorMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);

            // Set error message from backend or fallback
            const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
            setErrorMessage(errorMsg);
        }
    };

    return (
        <div className='HomePage bg-slate-300 h-screen w-full m-0 flex justify-center items-center'>
        <div className="main-container  bg-slate-200    w-12/13 h-11/12 rounded-lg flex  ">
        <div className="Login_PageContainer flex w-full">
            <div className="static">
                <div className="rounded-lg flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center absolute text-black z-40">
                        <a href=' /' ><img src={WhisperWaveLogo} alt="" /></a>
                        <span className="font-serif text-4xl LoginLogo">Whisper Wave</span>
                        <span className="font-serif tracking-[.25em] w-[29rem] text-center text-sm exo-2">
                            Message privately with friends and family using WhisperWave on your browser.
                        </span>
                    </div>
                    <div className="LoginPageLogo inline-block"></div>
                </div>
            </div>

            <div className="w-full flex items-center">
                <form
                    className="w-full flex justify-center items-center flex-col"
                    onSubmit={handleSubmit} // Attach form submit handler
                >
                    <h1 className="exo-2 text-5xl font-bold pb-2">Welcome Back to</h1>
                    <h1 className="exo-2 text-xl font-bold pb-2">Whisper Wave</h1>

                    {/* Email Input */}
                    <div className="m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 border-inherit border-0 outline-0 border-none rounded-xl border-white w-full bg-transparent"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-2 border-0 outline-0 border-none border-white w-full bg-transparent"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="text-red-500 mt-2">{errorMessage}</div>
                    )}

                    {/* Login Button */}
                    <div className="pt-5 text-center">
                        <button
                            type="submit"
                            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                        >
                            Login
                        </button>
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <span onClick={goToSignupPage} className="span cursor-pointer text-blue-600 underline">
                                Sign Up
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>

        
    );
}

export default LoginPage;
