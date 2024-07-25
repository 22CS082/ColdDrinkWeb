import React, { useState } from 'react';
import '../css/rate.css';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export default function Rate() {
  const { token } = useAuth();
  const [stars, setStars] = useState(0); // Initial rating state
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(null);

  // Handle star rating change
  const handleStarChange = (event) => {
    const newStars = parseInt(event.target.value);
    console.log('Selected Star Value:', newStars); // Debug statement
    setStars(newStars); // Update state with the selected star value
  };

  // Handle feedback change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log('Submitting Stars:', stars); // Debug statement
    try {
      const response = await fetch('http://localhost:5000/api/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ stars, feedback }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit rating: ${errorMessage}`);
      }
  
      toast.success('Rating submitted successfully!');
    } catch (error) {
      setError(error.message);
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    }
  };
  

  return (
    <main className="rate-cd__main">
      <div className="rate-wrapper">
        <div className="rate-title">Rate your experience</div>
        <div className="rate-content">
          We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.
        </div>
        <div className="rate-box">
          {[1, 2, 3, 4, 5].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                name="star"
                id={`rate-star${star}`}
                value={star}
                checked={stars === star}
                onChange={handleStarChange}
              />
              <label
                className="rate-star"
                htmlFor={`rate-star${star}`}
              ></label>
            </React.Fragment>
          ))}
        </div>
        <textarea
          cols="30"
          rows="6"
          placeholder="Tell us about your experience!"
          className="rate-textarea"
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        {error && <div className="rate-error">{error}</div>}
        <div className="rate-submit-btn" onClick={handleSubmit}>
          Send
        </div>
      </div>
    </main>
  );
}
