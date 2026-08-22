import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Cursor from "./components/Cursor";
import "./assets/css/cursor.css";
import "./assets/css/navbar.css";
import AOS from "aos";
import Header from "./components/Header";
import Home from "./pages/Home";
import Speed from "./pages/Speed";
import Wonder from "./pages/Wonder";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Cursor />
      <BrowserRouter>
        <Header />
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/speed" element={<Speed />} />
            <Route path="/wonder" element={<Wonder />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
