import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import Home from "./components/Home";
import Login from "./components/Login";
import NewRegister from "./components/NewRegister/NewRegister";
import { DoctorShift } from "./components/DoctorShift";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import { Admin } from "./components/Admin";

const ROLES = {
  User: "User",
  Admin: "Admin",
  Doctor: "Doctor",
  Assistant: "Assistant",
};

function App() {
  return (
    <>
      <Header />
      <div className="container ">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<NewRegister />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* Admin routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="users" element={<Admin />} />
              <Route path="products" element={<ProductList />} />
            </Route>
            {/* Doctor routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
              <Route path="doctor" element={<DoctorShift />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
