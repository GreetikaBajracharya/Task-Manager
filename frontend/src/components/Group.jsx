import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Task from "./Task";

export default function Group({ selectedFolder }) {
  const [groups, setGroups] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!selectedFolder) return;
    fetchGroups();
  }, [selectedFolder]);

  const fetchGroups = async () => {
    try {
      const res = await fetch(`http://localhost:5000/groups/${selectedFolder}`);
      const data = await res.json();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const addGroup = async () => {
    if (!name.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, folder_id: selectedFolder }),
      });
      const data = await res.json();
      setGroups((prev) => [...prev, data]);
      setName("");
      setShowInput(false);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      await fetch(`http://localhost:5000/groups/${id}`, { method: "DELETE" });
      setGroups((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  if (!selectedFolder) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a folder to see groups
      </div>
    );
  }


  const colors = [
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-100",
  "bg-purple-200",
  "bg-orange-200",
  "bg-pink-200"
];

  return (
    <div className="flex-1 p-4 ">
      <h2 className="text-xl font-bold mb-4"></h2>

      <div className="grid grid-cols-3 gap-10 mr-8 ml-8">
        {groups.map((group, index) => (
          <div
            key={group.id}
            className={`${colors[index % colors.length]} h-80 shadow-lg p-4 rounded-lg relative hover:shadow-2xl transition-all`}
          >
            <button
              onClick={() => deleteGroup(group.id)}
              className="absolute top-5 right-3 text-red-500 hover:text-red-700"
            >
              <Trash size={16} />
            </button>
            <h3 className="font-semibold text-lg text-center text-gray-600 break-words border-b border-gray-400">{group.name}</h3>
            <Task groupId={group.id} />
          </div>
        ))}

        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
          >
            + Add Group
          </button>
        )}

        {showInput && (
          <div className="bg-gray-100 p-4 rounded-lg border relative">
            <input
              type="text"
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={addGroup}
                className="flex-1 bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
