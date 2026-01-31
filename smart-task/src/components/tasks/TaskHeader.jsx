import React from "react";
export default function TaskHeader({ tasks }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-mono font-bold">
        Tasks ({tasks.length})
      </h2>
    </div>
  );
}
