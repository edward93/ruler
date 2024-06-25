import "./App.css";
import RulerComponent from "./Ruler.Component";

function App() {
  return (
    <>
      <h1>Ruler Demo</h1>
      <div className="card">
        <RulerComponent label="Ruler" numMarks={51} />
      </div>
    </>
  );
}

export default App;
