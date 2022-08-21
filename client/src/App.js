// client/src/App.js
import React from "react";

import { useState } from 'react';



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
      {/* <ProjectsDashboard /> */}
    </div>
  );
}

export default App;
