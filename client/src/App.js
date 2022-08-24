// client/src/App.js
import React from "react";
import { useState } from 'react';
import { Outlet } from "react-router-dom";

// Component imports
import TraceItNav from "./components/TraceItNav";



function App() {
  const [data, setData] = useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div >
      <TraceItNav />
      <Outlet />
    </div>
  );
}

export default App;
