import React from "react";
import Pages from "./components/mainpages/pages";
import Header from "./components/headers/header";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
   
    <Router>
      <Header />
      <Pages />
    </Router>
    
  );
}

export default App;
