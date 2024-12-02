import ConnectionSection from "./components/ConnectionSection/ConnectionSection";
import './App.css';
import ButtonsSection from "./components/SectionButtons/ButtonsSection";
import { ContextProvider } from "./Context/ContextProvider";
import MoviesList from "./components/MoviesList/MoviesList";
import InstanceSection from "./components/InstanceSection/InstanceSection";
import SharedContentButtons from "./components/SharedContentButtons/SharedContentButtons";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <InstanceSection />
          <SharedContentButtons />
        </div>
        <ConnectionSection />
        <ButtonsSection />
        <MoviesList />
      </ContextProvider>
    </div>
  );
}

export default App;
