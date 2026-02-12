import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import Cursor from "./components/Cursor";
import "./assets/css/cursor.css";
import AOS from "aos";
import Home from "./pages/Home";
import Speed from "./pages/Speed";
import Finder from "./pages/Finder";
import Resume from "./pages/Resume";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Cursor />
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/speed" element={<Speed />} />
            <Route path="/finder" element={<Finder />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
