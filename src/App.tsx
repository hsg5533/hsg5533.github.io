import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy, useEffect } from "react";
import Cursor from "./components/Cursor";
import "./assets/css/cursor.css";
import AOS from "aos";

const Home = lazy(() => import("./pages/Home"));
const Speed = lazy(() => import("./pages/Speed"));
const Finder = lazy(() => import("./pages/Finder"));

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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
