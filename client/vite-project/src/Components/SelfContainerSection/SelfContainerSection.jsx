

// import React from "react";

// function SelfContainerSection({ message }) {
//     return (
//         <div className="flex justify-end">
//             <div className="bg-emerald-800 text-green-300 py-3 px-4 rounded-r-lg rounded-l-lg max-w-sm break-words">
//                 {message}
//             </div>
//         </div>
//     );
// }

// export default SelfContainerSection;


import React from "react";


function SelfContainerSection({ message, theme }) {
    return (
        <div className="flex justify-end">
            <div
                className={`py-3 px-4 rounded-r-lg rounded-l-lg max-w-sm break-words ${
                    theme === "dark"
                        ? "bg-emerald-900 text-green-200"
                        : "bg-emerald-800 text-green-300"
                }`}
                aria-label="Your message"
                role="note"
            >
                {message}
            </div>
        </div>
    );
}



export default SelfContainerSection;

