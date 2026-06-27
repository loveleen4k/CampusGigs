import React from "react";
import Pages from "./components/mainpages/pages.js";
import Header from "./components/headers/header.js";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState.js";


function App() {
  return (
   
    <Router>
      <DataProvider>
        <Header />
        <Pages />
      </DataProvider>
    </Router>
    
  );
}

export default App;
