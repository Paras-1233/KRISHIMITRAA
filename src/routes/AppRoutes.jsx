import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home"; // ✅ import Home component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* ✅ Route for homepage */}
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
