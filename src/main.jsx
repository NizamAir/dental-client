import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./resetstyle.css";
import "./index.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "react-toastify/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode > </React.StrictMode>

  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
