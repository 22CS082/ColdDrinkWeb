// import React from 'react'
import "../css/About.css";

export default function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-head">
        <div className="main-about">
          <h6>Our Story</h6>
          <img src="\images\logo.png" alt="logo" />
          </div>
          <p>
            007 Beverages offers an exceptional selection of both classic and
            modern soft drinks. Our extensive array of brands caters to the
            varied preferences of consumers throughout numerous districts in
            Gujarat.
          </p>
        </div>
        <div className="about-our">
          <div data-aos="fade-up" className="about-our-left">
            <h1>Quality : </h1>
            <p>
              We prioritize maintaining exceptional quality standards to ensure
              customer satisfaction and meet regulatory requirements. Our raw
              materials are sourced from top-tier suppliers in the industry. Our
              production processes adhere to international quality assurance
              norms, and we are committed to consistently enhancing our products
              based on customer feedback.
            </p>
          </div>
          <div data-aos="fade-up" className="about-our-right">
            <h1>Research : </h1>
            <p>
              At 007, research and development play a crucial role in creating
              new products and flavors. We continuously analyze emerging
              consumer and market trends to design high-quality products that
              are future-ready. Our team consists of highly qualified, skilled,
              and experienced professionals, including engineers, technicians,
              quality controllers, sales personnel, analysts, and more.
            </p>
          </div>
        </div>
        <div className="about-journey">
          <h1>Our journey</h1>
          <div className="about-time">
            <div className="about-time-detail">
              <h1>2019</h1>
              <hr />
              <p>Bis queen is born</p>
              <p>Journey begin</p>
              <p>started to make water bottle</p>
            </div>
            <div className="about-time-detail">
              <h1>2021</h1>
              <hr />
              <p>007 is born</p>
              <p>Started journey with colddrink</p>
              <p>Started to make colddrink</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
