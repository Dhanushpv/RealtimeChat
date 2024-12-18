import { useState, useEffect } from 'react';
import axios from 'axios';
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png';

function AvailableGroups() {
    let params = new URLSearchParams(window.location.search);
    let token_key = params.get('login'); // Fetch token key from URL
    let token = localStorage.getItem(token_key); // Get the actual token
    const [groups, setGroups] = useState([]); // State to store fetched groups

    // Fetch groups from the server
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:4000/fetchGroups', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGroups(response.data);
                console.log("response.data",response.data)
            } catch (error) {
                console.error('Error fetching groups:', error.message);
            }
        };
        fetchGroups();
    }, []);

    return (
        <>
            <div className="sideBar flex flex-col bg-slate-200 w-full rounded-l-lg">
                <div className="sb-Header flex justify-between m-2 px-2 py-2 rounded-[15px] bg-white shadow-lg">
                    <div className="flex justify-center items-center">
                        <img src={WhisperWaveLogo} alt="Logo" className="w-3" />
                        <span className="px-3">Available Groups</span>
                    </div>
                </div>

                <div
                    className="sb-conversation m-2 px-3 py-3 shadow-lg pt-5 rounded-[15px] bg-white h-full overflow-y-auto 
                                 [&::-webkit-scrollbar]:w-0 
                                 [&::-webkit-scrollbar-track]:bg-transparent
                                 [&::-webkit-scrollbar-thumb]:bg-gray-300
                                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                    {groups.length > 0 ? (
                        groups.map((group) => (
                            <div key={group._id} className="p-3">
                                <div className="userListitems_container flex items-center bg-slate-300 rounded-[12px]">
                                    <div className="p-2">
                                        <p className="bg-slate-200 text-slate-400 p-3 px-4 border-4 border-white font-extrabold rounded-full">
                                            {group.chatName?.charAt(0).toUpperCase() || "?"}
                                        </p>
                                    </div>
                                    <div className="w-full px-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xl font-semibold text-gray-700">
                                                {group.chatName || "Unnamed Group"}
                                            </p>
                                            <p className="text-xs text-gray-700">
                                                {group.createdAt?.slice(0, 10) || "Unknown Date"} {/* Date */}
                                            </p>
                                        </div>
                                        <p className="text-gray-700 text-xs">{group.description || "No description available"}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No groups available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default AvailableGroups;
