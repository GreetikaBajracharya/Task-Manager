import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Folder from "./components/Folder";
import Group from "./components/Group";

function App() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <Router>
      <div className="flex h-screen">
        <Folder 
          onSelectFolder={setSelectedFolder} 
          selectedFolder={selectedFolder} 
        />

        <div className="flex-1 ml-56">
          <Routes>
            <Route 
              path="/" 
              element={<Group selectedFolder={selectedFolder} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
