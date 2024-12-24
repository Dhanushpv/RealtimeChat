// function Profile(){
    
//     const [LoginName, setLoginName] = useState('User');

//     return(<>
//     <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto ">
//   <div className="flex justify-between items-center mb-4">
//     <i className="fas fa-bars text-xl"></i>
//     <h1 className="text-sm font-semibold tracking-widest">
//       STREETLEAGUE CHAMPS
//     </h1>
//     <i className="fas fa-search text-xl"></i>
//   </div>
//   <div className="text-center">
//     <div className="relative inline-block">
//       <img
//         alt="Image of a person with a cap and white shirt"
//         className="rounded-full mx-auto"
//         height={300}
//         src="https://storage.googleapis.com/a1aa/image/zowIu7LfPsTANiZRoNa6oWozeEifUneo7SchS5LseEuXfihfJA.jpg"
//         width={300}
//       />
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="bg-blue-200 rounded-full w-72 h-72"></div>
//       </div>
//     </div>
//     <h2 className="text-4xl font-bold mt-4">SHANE O’NEILL</h2>
//     <div className="flex justify-center items-center mt-2">
//       <span className="text-sm font-light">01</span>
//       <div className="w-16 h-px bg-black mx-2"></div>
//       <span className="text-sm font-light">05</span>
//     </div>
//     <p className="text-sm font-light mt-2">
//       Shane O’Neill started skating when he was ten. In 2016 he won the
//       supercrown.
//     </p>
//   </div>
//   <div className="flex justify-between mt-8 text-sm font-light">
//     <div>
//       <p>STANCE</p>
//       <p className="font-semibold">Goofy rider</p>
//     </div>
//     <div>
//       <p>BORN IN</p>
//       <p className="font-semibold">Melbourne</p>
//     </div>
//     <div>
//       <p>SLS PRO</p>
//       <p className="font-semibold">Since 2010</p>
//     </div>
//     <div>
//       <p>DATE OF BIRTH</p>
//       <p className="font-semibold">Jan 2nd, 1990</p>
//     </div>
//   </div>
// </div>


//     </>)
// }
// export default Profile

import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    const tokenKey = params.get('login');
    const receiver = params.get('receiver');
    const chatId = params.get('chatId');
    const token = localStorage.getItem(tokenKey);

  const [loginName, setLoginName] = useState("User");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/logined/${userId}`); // Adjust the route if needed
        setUserData(response.data.user);
     
        setLoginName(response.data.user.name || "User");
        console.log(response)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <i className="fas fa-bars text-xl"></i>
          <h1 className="text-sm font-semibold tracking-widest">
          Whisper Wave
          </h1>
          <i className="fas fa-search text-xl"></i>
        </div>
        <div className="text-center">
          <div className="relative inline-block">
            <img
              alt="Image of a person with a cap and white shirt"
              className="rounded-full mx-auto z-40"
              height={300}
              src={
                userData?.profileImage ||
                "https://storage.googleapis.com/a1aa/image/zowIu7LfPsTANiZRoNa6oWozeEifUneo7SchS5LseEuXfihfJA.jpg"
              }
              width={300}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <div className="bg-blue-200 rounded-full w-72 h-72"></div> */}
            </div>
          </div>
          <h2 className="text-4xl font-bold mt-4">{userData?.name || "SHANE O’NEILL"}</h2>
          <div className="flex justify-center items-center mt-2">
            <span className="text-sm font-light">01</span>
            <div className="w-16 h-px bg-black mx-2"></div>
            <span className="text-sm font-light">05</span>
          </div>
          <p className="text-sm font-light mt-2">
            {userData?.bio || "Shane O’Neill started skating when he was ten. In 2016 he won the supercrown."}
          </p>
        </div>
        <div className="flex justify-between mt-8 text-sm font-light">
          <div>
            <p>STANCE</p>
            <p className="font-semibold">{userData?.stance || "Goofy rider"}</p>
          </div>
          <div>
            <p>BORN IN</p>
            <p className="font-semibold">{userData?.birthplace || "Melbourne"}</p>
          </div>
          <div>
            <p>SLS PRO</p>
            <p className="font-semibold">{userData?.slsProSince || "Since 2010"}</p>
          </div>
          <div>
            <p>DATE OF BIRTH</p>
            <p className="font-semibold">{userData?.dob || "Jan 2nd, 1990"}</p>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
}

export default Profile;
