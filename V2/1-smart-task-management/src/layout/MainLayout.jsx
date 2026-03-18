import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useTaskContext } from "../context/TaskProvider";
import AddTask from "./AddTask";

const MainLayout = ({ openModalHandle }) => {
  const { tasks } = useTaskContext();
  const [openModal, setOpenModal] = useState(false);

  function openModalHandle() {
    setOpenModal((prev) => !prev);
  }

  // modal open logic
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <div className="relative min-h-screen">
      {/* ================= MODAL ================= */}
      {openModal && (
        <AddTask openModal={openModal} openModalHandle={openModalHandle} />
      )}

      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-bold">Prithwi's Dashboard</p>
          <p className="text-gray-500">
            Manage your tasks and sprint in real time
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={openModalHandle}
        >
          Add Task +
        </button>
      </header>

      <hr className="mb-6" />

      {/* ================= TASK CARDS ================= */}
      <div className="flex flex-wrap gap-6">
        {tasks.map((task) => (
          <Card
            key={task.id}
            priority={task.priority}
            title={task.title}
            date={task.date}
          />
        ))}
      </div>
    </div>
  );
};

export default MainLayout;
