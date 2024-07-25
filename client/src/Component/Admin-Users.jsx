import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/adminuser.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Authorization token is missing!");
      return;
    }

    const getAllUserData = async () => {
      try {
        setIsLoading(true); // Start loading indicator

        const response = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };

    getAllUserData();
  }, []); // Fetch data on component mount, token dependency removed

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      // Update user list after deletion
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data</h1>
      </div>
      <div className="container admin-users">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminUsers;
