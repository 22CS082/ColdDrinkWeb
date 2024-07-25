import { useState,useEffect } from "react";
import "../css/Home.css";

export default function Home(){
    return(
        <><div className="main">
            <div className="home-container">
                <div className="home-text">
                <h1>Jeera</h1>
                <h3>Sip, sip, hooray!<br />Cheers to the fizzy goodness of jeera!</h3>
                </div>
                <div className="home-image">
                    <img src="\images\home.png" alt="cold_drinks" />
                </div>
            </div>
            </div>
            <div className="main2">
            <div className="home-container">
            <div className="home-image home-image-large">
                    <img src="\images\home1.png"  alt="cold_drinks" />
                </div>
                <div className="home-text">
                <h1>Orange</h1>
                <h3>Squeeze the Day with Our Orange Burst<br /> and experience its vibrant zest!</h3>
                </div>
            </div>
            </div>
        </>
    )
}
