import { MemoryRouter, Routes, Route } from "react-router";
import Home from "./home.tsx";
import Expenses from "./expenses.tsx";
import Analysis from "./analysis.tsx";
import Settings from "./settings.tsx";

export function App() {
  return (
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses/>} /> 
          <Route path="/analysis" element={<Analysis/>}/>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
  );
}
