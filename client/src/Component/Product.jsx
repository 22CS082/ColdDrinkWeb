import { useState, useEffect } from "react";
import "../css/Product.css";

export default function Product() {
    return (
        <>
            <div className="Product-container">
            <div className="product-h1">
                <h1>Products</h1>
                </div>
                <div className="images-product">
                    <div className="bottel">
                        <h1>Jeera</h1>
                        <img src="\images\jeera.png" alt="jeera" />
                    </div>
                    <div className="bottel">
                        <h1>Cola</h1>
                        <img src="\images\cola.png" alt="Cola" />
                    </div>
                    <div className="bottel">
                        <h1>Fresh Lemon</h1>
                        <img src="\images\fresh_lemon.png" alt="Fresh_lemon" />
                    </div>
                    <div className="bottel">
                        <h1>Clear Lemon</h1>
                        <img src="\images\clear_lemon.png" alt="Clear_lemon" />
                    </div>
                    <div className="bottel">
                        <h1>Mango</h1>
                        <img src="\images\mango.png" alt="mango" />
                    </div>
                    <div className="bottel">
                        <h1>Orange</h1>
                        <img src="\images\orange.png" alt="orange" />
                    </div>
                    <div className="bottel">
                        <h1>Malt</h1>
                        <img src="\images\malt.png" alt="malt" />
                    </div>
                </div>
            </div>
        </>);
}