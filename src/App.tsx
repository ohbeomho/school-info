import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./components/Layout";
import Lunch from "./pages/Lunch";
import Timetable from "./pages/Timetable";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/lunch" element={<Lunch />}></Route>
        <Route path="/timetable" element={<Timetable />}></Route>
      </Routes>
    </Layout>
  );
}
