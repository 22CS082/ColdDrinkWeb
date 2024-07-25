import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Rate from "./Component/Rate"; // Corrected import to use PascalCase for components
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Product from "./Component/Product";
import Login from "./Component/Login";
import Register from "./Component/Register";
import { Logout } from "./Component/Logout";
import AdminLayout from "./Component/Layouts/Admin-Layout";
import AdminContacts from "./Component/Admin-Contacts";
import AdminUsers from "./Component/Admin-Users";
import AdminUpdate from "./Component/AdminUpdate";
import AdminRoute from "./Component/AdminRoute";
import AdminProducts from "./Component/AdminProducts";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/api/rate" element={<Rate />} />
          <Route path="/product" element={<Product />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />

          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>{/* Assuming Error component exists */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
