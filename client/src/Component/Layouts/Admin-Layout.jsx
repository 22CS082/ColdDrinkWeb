import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import "../../css/AdminLayout.css";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="admin-1">
        <div className="admin-container">
          <nav className="admin-nav">
            <ul>
              <li>
                <Link to="/admin/users">
                  <FaUser /> Users
                </Link>
              </li>
              <li>
                <Link to="/admin/contacts">
                  <FaMessage /> Contacts
                </Link>
              </li>
              <li>
                <Link to="/admin/products">
                  <FaRegListAlt /> Products
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaHome /> Home
                </Link>
              </li>
              {user && user.isadmin && (
                <li>
                  <Link to="/admin">Admin Dashboard</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
