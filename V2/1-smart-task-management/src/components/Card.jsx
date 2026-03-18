// import React from 'react'

// const Card = ({ priority, title, date }) => {
//   return (
//     <div className="w-[350px] h-[200px] bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-200">
      
//       <div>
//         <p className="text-sm font-semibold text-gray-500">
//           {priority} Priority
//         </p>
//         <p className="text-lg font-bold text-gray-800 mt-2">
//           {title}
//         </p>
//       </div>

//       <div>
//         <p className="text-sm text-gray-400">
//           Due: {date}
//         </p>
//       </div>

//     </div>
//   )
// }

// export default Card;

// components/Card.jsx

import React from "react";

const Card = ({ priority, title, date }) => {
  const priorityColor =
    priority === "High"
      ? "text-red-500"
      : priority === "Medium"
      ? "text-yellow-500"
      : "text-green-500";

  return (
    <div className="w-[350px] h-[200px] bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition">
      
      <div>
        <p className={`text-sm font-semibold ${priorityColor}`}>
          {priority} Priority
        </p>
        <p className="text-lg font-bold text-gray-800 mt-2">
          {title}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-400">
          Due: {date}
        </p>
      </div>

    </div>
  );
};

export default Card;