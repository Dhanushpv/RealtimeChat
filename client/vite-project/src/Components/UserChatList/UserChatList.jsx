import React from "react";


function UserChatList({props}){
    return(<>
        <div className="userListitems_container flex items-center bg-slate-300 rounded-[12px]">
            <div className="p-2"><p className="bg-slate-200 text-slate-400  p-3 px-4  border-4 border-white font-extrabold    rounded-full">{props.name[0]}</p>            </div>
            <div className="w-full px-2">
                <div className="flex items-center justify-between">
                <p className=" text-xl  font-semibold text-gray-700">{props.name}</p>
                <p className=" text-xs text-gray-700">{props.time}</p>
                </div>
                
                <p className="text-gray-700 text-xs">{props.lastmessaage}</p>
                
            </div>
        </div>
        
        </>)
}export default UserChatList