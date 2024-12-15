// import Logo from '../../Images/WelcomPagelogo.png'
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png'
import '../WelcomPage/WelcomPage.css'

function WelcomPage(){
    return(<>
    
    <div className="Welcome_Container w-full flex flex-col justify-center items-center ">
        {/* <div className='w-80'><img src={Logo} alt="" /></div> */}
        <div className=' flex flex-col justify-center items-center '><img className='w-48' src={WhisperWaveLogo} alt="" />
        <span className='flex flex-col justify-center items-center'>
        <span className='font-serif text-4xl exo-2'>WhisperWaveLogo</span>
        <span className='font-serif tracking-[.25em] w-[29rem] text-center text-sm'>Message privately with friends and family using WhisperWave on your browser.</span>

        </span>
    </div>
    </div>
    
    </>)
}export default WelcomPage