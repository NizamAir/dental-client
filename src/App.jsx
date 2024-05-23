// import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import Register from "./components/Register/Register";
import { DoctorShift } from "./components/DoctorShift";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Header from "./components/Header/Header";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Users from "./components/Users/Users";
import DoctorList from "./components/Doctors/DoctorList";
import DoctorClient from "./components/DoctorClient";
import AssistantShift from "./components/AssistantShift";
import ClientShift from "./components/ClientShift";
import Footer from "./components/Footer/Footer";

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
      <div className="height_wrapper">
        <div className="container">
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="users" element={<Users />} />
                <Route path="products" element={<ProductList />} />
                <Route path="doctors" element={<DoctorList />} />
              </Route>
              {/* Doctor routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
                <Route path="doctorshift" element={<DoctorShift />} />
                <Route path="/doctorclient" element={<DoctorClient />} />
              </Route>
              {/* Assistant routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Assistant]} />}>
                <Route path="assistantshift" element={<AssistantShift />} />
              </Route>

              {/* User routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="usershift" element={<ClientShift />} />
              </Route>
              {/* Catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
