import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import JiroForm from "./components/JiroForm";
import JiroResult from "./components/JiroResult";
import { ROUTES } from "./constants";

function App() {
  return (
    <Router basename="/app">
      <Routes>
        <Route path={ROUTES.JiroForm} element={<JiroForm />} />
        <Route path={ROUTES.JiroResult} element={<JiroResult />} />
      </Routes>
    </Router>
  );
}

export default App;
