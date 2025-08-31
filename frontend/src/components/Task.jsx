import React, { useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";

export default function Task({ groupId }) {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    if (!groupId) return;
    fetchTasks();
  }, [groupId]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/group/${groupId}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t_name: newTaskName, group_id: groupId }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
      setNewTaskName("");
      setAdding(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus, taskName) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t_name: taskName, completed: !currentStatus }),
      });
      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="mt-2 space-y-1 overflow-y-auto max-h-52 pr-1 flex flex-col">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-transparent rounded px-2 py-1 shadow-sm"
            >
              <span
                className={`text-sm cursor-pointer select-none break-words ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() =>
                  toggleTaskCompletion(task.id, task.completed, task.t_name)
                }
              >
                • {task.t_name}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {!adding ? (
        <button
          onClick={() => setAdding(true)}
          className="absolute bottom-8 right-2 flex items-center bg-gray-500 text-white px-3 py-1 rounded-full shadow hover:bg-gray-600 transition-all"
        >
          <Plus size={14} className="mr-1" /> Add
        </button>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="flex-1 p-1 border rounded text-sm"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-pink-500 text-white px-2 rounded hover:bg-pink-600 text-sm"
          >
            Save
          </button>
          <button
            onClick={() => {
              setAdding(false);
              setNewTaskName("");
            }}
            className="bg-gray-300 px-2 rounded text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
