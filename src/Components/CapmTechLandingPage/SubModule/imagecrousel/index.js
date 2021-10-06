import React, { createRef, useState } from "react";
import hdfc from "../../../../assets/Images/CAPMLanding/hdfcbank.png";
import zerodha from "../../../../assets/Images/CAPMLanding/zerodha.png";
import client1 from "../../../../assets/Images/CAPMLanding/client1.png";
import client2 from "../../../../assets/Images/CAPMLanding/client2.png";
import client3 from "../../../../assets/Images/CAPMLanding/client3.png";
import "./style.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
function CustomersTestimonial() {
  const navRef = createRef();
  const [next, setNext] = useState(false);
  const handleNav = (direction) => {
    setNext(true);
    if (direction === "left") {
      navRef.current.scrollLeft -= 500;
    } else {
      navRef.current.scrollLeft += 500;
    }
  };
  return (
    <div className="container mb-5">
      <div className="row customer-slider" ref={navRef}>
        <div className="col">
          <div className="Customer-testimonial-card">
            <p className="customer-testimonial-para">
              We were treated like royalty. I don't always clop, but when I do,
              it's because of CAPMTech. CAPMTech has really helped our business.
            </p>
            <div className="row">
              <div className="col">
                <div className="media">
                  <img
                    className="mr-3 customer-testimonial-client-images"
                    src={client1}
                    alt="Generic"
                  />
                  <div className="media-body customer-testimonial-media-body">
                    <h5 className="mt-0">Prakash Gupta</h5>
                    <p>Co, Team Leader</p>
                  </div>
                </div>
              </div>
              <div className="col customer-testimonial-media-image">
                <img src={hdfc} alt="hdfc" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="Customer-testimonial-card">
            <p className="customer-testimonial-para">
              Thank you for making it painless, pleasant and most of all hassle
              free! CAPMTech has completely surpassed our expectations.
            </p>
            <div className="row">
              <div className="col">
                <div className="media">
                  <img
                    className="mr-3 customer-testimonial-client-images"
                    src={client2}
                    alt="Generic"
                  />
                  <div className="media-body customer-testimonial-media-body">
                    <h5 className="mt-0">Radhika Jain</h5>
                    <p>CTO</p>
                  </div>
                </div>
              </div>
              <div className="col customer-testimonial-media-image">
                <img src={zerodha} alt="hdfc" />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="Customer-testimonial-card">
            <p className="customer-testimonial-para">
              I have gotten at least 50 times the value from CAPMTech. I like
              CAPMTech more and more each day because it makes my life a lot
              easier.
            </p>
            <div className="row">
              <div className="col">
                <div className="media">
                  <img
                    className="mr-3 customer-testimonial-client-images"
                    src={client3}
                    alt="Generic"
                  />
                  <div className="media-body customer-testimonial-media-body">
                    <h5 className="mt-0">Ramesh Sisodiya</h5>
                    <p>CEO</p>
                  </div>
                </div>
              </div>
              <div className="col customer-testimonial-media-image">
                <img src={hdfc} alt="hdfc" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Customer-testimonial-buttons mt-4">
        <div className="d-flex justify-content-center">
          <div className="p-2">
            <button
              className={
                next
                  ? `Customer-testimonial-previous-btn`
                  : `Customer-testimonial-previous-btn-active`
              }
              onClick={() => handleNav("left")}
            >
              <AiOutlineArrowLeft style={{ color: "white", width: "14px" }} />
            </button>
          </div>
          <div className="p-2">
            <button
              className="Customer-testimonial-next-btn"
              onClick={() => handleNav("right")}
            >
              <AiOutlineArrowRight style={{ color: "white", width: "14px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomersTestimonial;
