import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth"; // Import useAuth to access storeTokenInLS
import "../css/adminContact.css";

const AdminContacts = () => {
  const token = localStorage.getItem("token");// Destructure storeTokenInLS from useAuth
  const [contactData, setContactData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading indicator

  const getContactData = async () => {
     

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      setIsLoading(true); // Start loading indicator

      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response Status:', response.status); // Debugging: Check the response status

      if (!response.ok) {
        throw new Error(`Failed to fetch contacts: ${response.statusText}`);
      }

      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  const deleteContactById = async (id) => {
    const token = storeTokenInLS(); // Retrieve and set the token

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.statusText}`);
      }

      getContactData(); // Refresh contact data after deletion
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact");
    }
  };

  useEffect(() => {
    getContactData(); // Fetch contact data when the component mounts
  }, []); // Ensure the effect runs only once when the component mounts

  return (
    <section className="admin-contacts-section">
      <h1>Admin Contact Data</h1>
      <div className="container admin-users">
        {isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(contactData) && contactData.length > 0 ? (
          contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  Delete
                </button>
              </div>
            );
          })
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </section>
  );
};

export default AdminContacts;
