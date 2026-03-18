import React, { useEffect, useState } from "react";
// import { useTaskContext } from "../context/TaskProvider";
import { createTask, readTasks, updateTask, deleteTask } from "../hooks/crudOperation";

const AddTask = ({ openModalHandle }) => {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  createTask({
    title,
    priority,
    date,
    taskDescription
  });
  
  
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={openModalHandle}
        />

        {/* Modal Box */}
        <div className="relative bg-white w-full max-w-xl mx-4 rounded-2xl shadow-2xl p-6">
          {/* Close Button */}
          <button
            onClick={openModalHandle}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Task
          </h2>

          <form className="space-y-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                type="text"
                placeholder="Please enter title of task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Task Details
              </label>
              <textarea
                rows="4"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                placeholder="Enter detailed description..."
                className="border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add New Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
