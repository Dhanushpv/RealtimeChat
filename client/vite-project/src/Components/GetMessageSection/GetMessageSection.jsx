// import React from "react"

// function GetMessageSection() {

//    return (<>
//       <div className="flex justify-center items-start ">
//          <div className="">
//             <p className="bg-emerald-300 text-slate-400  px-4 py-2 text-emerald-950 border-4 border-white font-extrabold    rounded-full">i</p>            
//          </div>
//          <div className="bg-emerald-300 py-1 px-2 rounded-r-lg rounded-l-lg flex justify-Start ">

//             <div className="userListitems_container flex items-center  rounded-[12px]">

//                <div className="w-full px-2">

//                   <p className="   font-semibold text-xs">User1</p>
//                   <p className="text-gray-700 text-xl">hi</p>
//                   <p className=" text-xs flex justify-end ">12:00pm</p>

//                </div>
//             </div>
//          </div>
//       </div>
//    </>)
// }
// export default GetMessageSection


import React from "react";

function GetMessageSection({ name = "Unknown", content, time }) {
    return (
        <div className="flex items-start gap-2">
            {/* Sender's Avatar */}
            <div className="flex-shrink-0">
                <p className="bg-emerald-300 text-slate-400 px-4 py-2 text-emerald-950 border-4 border-white font-extrabold rounded-full">
                    {name.charAt(0).toUpperCase()}
                </p>
            </div>

            {/* Message Bubble */}
            <div className="bg-emerald-300 py-2 px-3 rounded-r-lg rounded-l-lg flex flex-col max-w-sm break-words">
                <p className="font-semibold text-xs text-emerald-950">{name}</p>
                <p className="text-gray-700 text-sm">{content}</p>
                <p className="text-xs text-right text-gray-600">{time}</p>
            </div>
        </div>
    );
}

export default GetMessageSection;

