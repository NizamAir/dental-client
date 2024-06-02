import { Routes, Route } from "react-router-dom";
import ProductList from "./components/AdminProducts/ProductList";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { DoctorShift } from "./components/DoctorShift/DoctorShift";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Header from "./components/Header/Header";
import Missing from "./components/Missing/Missing";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Users from "./components/Users/Users";
import DoctorList from "./components/AdminDoctors/DoctorList";
import DoctorClient from "./components/DoctorClient/DoctorClient";
import AssistantShift from "./components/AssistantShift/AssistantShift";
import ClientShift from "./components/ClientShift/ClientShift";
import Footer from "./components/Footer/Footer";
import Doctors from "./components/Doctors/Doctors";
import SingleDoctor from "./components/DoctorSingle/SingleDoctor";
import ClientAllShifts from "./components/ClientAllShifts/ClientAllShifts";
import AssistantAllShifts from "./components/AssistantAllShifts/AssistantAllShifts";
import DoctorAllShifts from "./components/DoctorAllShifts/DoctorAllShifts";
import ReviewEdit from "./components/ReviewEdit/ReviewEdit";
import Products from "./components/Products/Products";
import DoctorReview from "./components/DoctorReview/DoctorReview";
import AdminStatistics from "./components/AdminStatistics/AdminStatistics";

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
          <div className="centre__wrapper">
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route index element={<Home />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:id" element={<SingleDoctor />} />
                <Route path="products" element={<Products />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                {/* Admin routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users" element={<Users />} />
                  <Route path="productsedit" element={<ProductList />} />
                  <Route path="doctorsedit" element={<DoctorList />} />
                  <Route path="statistic" element={<AdminStatistics />} />
                </Route>
                {/* Doctor routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
                  <Route path="doctorshift" element={<DoctorShift />} />
                  <Route path="doctorclient" element={<DoctorClient />} />
                  <Route path="alldoctorshifts" element={<DoctorAllShifts />} />
                  <Route path="reviews" element={<DoctorReview />} />
                </Route>
                {/* Assistant routes */}
                <Route
                  element={<RequireAuth allowedRoles={[ROLES.Assistant]} />}
                >
                  <Route path="assistantshift" element={<AssistantShift />} />
                  <Route
                    path="allassisshifts"
                    element={<AssistantAllShifts />}
                  />
                </Route>

                {/* User routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                  <Route path="usershift" element={<ClientShift />} />
                  <Route path="allshifts" element={<ClientAllShifts />} />
                  <Route path="reviewedit" element={<ReviewEdit />} />
                </Route>
                {/* Catch all */}
                <Route path="*" element={<Missing />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
