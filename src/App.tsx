import React from "react";
import Header from "./components/Header";
import PopulationGraphPage from "./pages/PopulationGraphPage";
import "./assets/styles/reset.css";

function App() {
  return (
    <div className="layout">
      <Header />
      <PopulationGraphPage />
    </div>
  );
}

export default App;
