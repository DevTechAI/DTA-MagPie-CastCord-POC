import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateEvent from "./pages/CreateEvent";
import CastingForm from "./pages/CastingForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateEvent />} />
        <Route path="/casting-call/:eventId" element={<CastingForm />} />
      </Routes>
    </BrowserRouter>
  );
}
