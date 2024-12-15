import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png'



function AvailableGroups() {

    return (
        <>
            <div className=" sideBar flex flex-col  bg-slate-200 w-full rounded-l-lg">
                <div className="sb-Header flex justify-between m-2 px-2 py-2 rounded-[15px] bg-white shadow-lg">
                    <div className='flex justify-center items-center'>
                        <img src={WhisperWaveLogo} alt="" className='w-3' />
                        <span className='px-3'> Available Groups</span>
                    </div>
                </div>

                <div className="sb-search m-2 px-3 py-3 rounded-[15px] bg-white flex items-center shadow-lg ">
                    <SearchIcon />
                    <input placeholder="Search" className='search-Box px-2 border-0 outline-0 border-none border-white bg-transparent' />


                </div>
                <div className="sb-conversation m-2 px-3 py-3 shadow-lg  pt-5 rounded-[15px] bg-white h-full overflow-y-auto   [&::-webkit-scrollbar]:w-0 
                                 
                                 [&::-webkit-scrollbar-track]:bg-transparent
                                 [&::-webkit-scrollbar-thumb]:bg-gray-300
                                 dark:[&::-webkit-scrollbar-track]:bg-transparent
                                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ">

                  <div className='p-3'>
                      <div className="userListitems_container  flex items-center bg-slate-300 rounded-[12px]">
                        <div className="p-2"><p className="bg-slate-200 text-slate-400  p-3 px-4  border-4 border-white font-extrabold    rounded-full">A</p>            </div>
                        <div className="w-full px-2">
                            <div className="flex items-center justify-between">
                                <p className=" text-xl  font-semibold text-gray-700">Available Groups</p>
                                <p className=" text-xs text-gray-700"></p>
                            </div>

                            <p className="text-gray-700 text-xs"></p>

                        </div>
                    </div>
                  </div>

                    


                </div>
            </div>
        </>
    )

}
export default AvailableGroups