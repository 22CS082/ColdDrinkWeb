
import "../css/Footer.css"

export default function Footer() {
  return (
    <>
    <hr />
     <div className="footer-component">
        <div className="footer-right">
            <p>007 Beverages offers an exceptional selection
              of both classic and modern soft drinks. Our extensive array of
              brands caters to the varied preferences of consumers throughout
              numerous districts in Gujarat.</p>
            <h1>
                <i className="ri-map-pin-2-line"></i> <h6>007 PVT.LTD , BAGATHADA ROAD , MORBI-363641 , GUJRAT</h6> 
            </h1>
            <h1><i className="ri-phone-line"></i> <p> <span>Contact : </span>0987654321</p></h1>
        </div> 
        <div className="footer-left">
            <h1>Working time :</h1>
            <p>Monday to Sunday - 9am to 8pm - No holiday on sunday
            </p>
            <div className="footer-left-social">
                <a href="https://www.instagram.com/bis__queen/?igsh=MTZrempscTRvaW13ag%3D%3D" target="_blank" rel="noopener noreferrer" ><i className="ri-instagram-line"></i></a>
                <a href="https://wa.link/e89h03"  target="_blank" rel="noopener noreferrer"><i className="ri-whatsapp-line"></i></a>
                <a href="mailto:ankitpatel6320@gmail.com" ><i className="ri-mail-line"></i></a>
            </div>
        </div>   
    </div> 
    </>
  );
}
