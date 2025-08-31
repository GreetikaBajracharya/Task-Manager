import React, { useEffect, useState } from "react";
import { Trash, Folder as FolderIcon } from "lucide-react";

export default function Folder({ onSelectFolder, selectedFolder }) {
  const [folders, setFolders] = useState([]);
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false); 

  const fetchFolders = async () => {
    try {
        const res = await fetch("http://localhost:5000/folders");
        const data = await res.json();
        setFolders(data);
    } catch (error) {
        console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const addFolder = async () => {
    if (!name.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, emoji: "" }),
      });
        const data = await res.json();
        setFolders((prev) => [...prev, data]);
        setName("");
        setShowInput(false);
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  const deleteFolder = async (id) => {
    try {
      await fetch(`http://localhost:5000/folders/${id}`, { method: "DELETE" });
      setFolders((prev) => prev.filter((f) => f.id !== id));
      if (selectedFolder === id) onSelectFolder(null);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <div className="fixed w-56 h-screen bg-pink-100 shadow-2xl flex flex-col p-4">
      <h3 className="text-2xl text-center text-pink-700 font-bold mb-4 border-b-1">
        Folders
      </h3>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => onSelectFolder && onSelectFolder(folder.id)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer border-b-1 border-pink-500
              ${selectedFolder === folder.id ? "bg-pink-300 rounded" : "hover:bg-pink-200"}`}
          >
            <span className="font-semibold text-gray-700 flex items-center">
              <FolderIcon size={16} className="mr-2 text-pink-600" />
              {folder.emoji || ""} {folder.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                deleteFolder(folder.id);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full bg-pink-400 text-white p-2 rounded hover:bg-pink-500"
          >
            + Add Folder
          </button>
        )}

        {showInput && (
          <div>
            <input
              type="text"
              placeholder="New Folder"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={addFolder}
                className="flex-1 bg-pink-400 text-white p-2 rounded hover:bg-pink-500"
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



