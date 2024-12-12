import React from "react";
import ConnectionSection from "./components/ConnectionSection/ConnectionSection";
import './App.css';
import ButtonsSection from "./components/SectionButtons/ButtonsSection";
import { ContextProvider } from "./Context/ContextProvider";
import MoviesList from "./components/MoviesList/MoviesList";
import InstanceSection from "./components/InstanceSection/InstanceSection";
import SharedContent from "./components/SharedContent/SharedContent";
import HealthSection from "./components/HealthSection/HealthSection";

function App() {
  return (
    <div className="App" style={{backgroundColor: '#3d587f'}}>
      <ContextProvider>
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "40px" }}>
            <div style={{ marginBottom: "20px" }}>
              <HealthSection />
            </div>
            <div>
              <InstanceSection />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <SharedContent />
          </div>
        </div>
        <ConnectionSection />
        <ButtonsSection />
        <MoviesList />
      </ContextProvider>
    </div>
  );
}

export default App;
