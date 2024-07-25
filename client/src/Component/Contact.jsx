import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import '../css/Contact.css'; // Assuming you have a CSS file for styling

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [contact, setContact] = useState(defaultContactFormData);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast("Message sent successfully");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending the message");
    }
    console.log(contact);
  };

  return (
    <>
      <div className="Contact-container">
        <div className="Contact-text">
          <div className="contact-header">
            <h1>Contact us</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="contact-textlabel">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={contact.username}
                onChange={handleInput}
                placeholder="Enter your username"
                autoComplete="off"
                required
              />
            </div>
            <div className="contact-textlabel">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={contact.email}
                onChange={handleInput}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>
            <div className="contact-textlabel">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={contact.message}
                onChange={handleInput}
                placeholder="Enter message"
                autoComplete="off"
                required
                cols="30"
                rows="6"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-submit"
              style={{ width: '100px', borderRadius: '5px' }}
            >
              Submit
            </button>
          </form>
          <div className="rate">
            <Link to="/api/rate" className="rate-link">
              <h2>Rate your Experience....!!!</h2>
            </Link>
          </div>
        </div>
        <div className="Contact-image">
          <img src="/images/contactt.png" alt="contact" />
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.35620775878!2d70.73849397508671!3d22.863296279285812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959f4672f464fc9%3A0x6926d0670fee2aff!2sBagathala%20Rd%2C%20Gujarat%20363641!5e0!3m2!1sen!2sin!4v1720329854337!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
