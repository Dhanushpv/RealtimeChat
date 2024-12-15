import { Button } from '@mui/material';
import LoginPageLogo from '../../Images/LoginPage.jpg'
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png'
import '../LoginPage/LoginPage.css'

function LoginPage() {
    return (<>

        <div className="Login_PageContainer flex  w-full">
            <div className=' '>

                <div className='static'>
                    <div className='rounded-lg flex  justify-center items-center'>
                        <div className='flex flex-col justify-center items-center absolute text-black  z-40'>
                            <img src={WhisperWaveLogo} alt="" />
                            <span className='font-serif text-4xl LoginLogo  '>Whisper Wave</span>
                            <span className='font-serif tracking-[.25em] w-[29rem] text-center text-sm exo-2'>Message privately with friends and family using WhisperWave on your browser.</span>

                        </div>
                        <div className='LoginPageLogo inline-block'></div>

                    </div>
                </div>
            </div>
            <div className='w-full flex items-center'>
                <div className='w-full flex justify-center items-center flex-col'>
                    <h1 className='exo-2 text-5xl font-bold pb-2 '>Welcome Back to</h1>
                    <h1 className='exo-2 text-xl font-bold pb-2 '>Whisper Wave</h1>
                    <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
                        <input type="email" placeholder='Eamil' className='px-2 border-inherit border-0 outline-0 border-none rounded-xl border-white w-full bg-transparent' />
                    </div>
                    <div className='m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg w-1/2'>
                        <input type="text" placeholder='Password' className='px-2 border-0 outline-0 border-none border-white w-full bg-transparent' />
                    </div>
                    <div className='pt-5'>
                        <button class="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                                    border-blue-600
                                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                            Login 
                        </button>
                    </div>
                </div >

            </div>

        </div>

    </>)
} export default LoginPage