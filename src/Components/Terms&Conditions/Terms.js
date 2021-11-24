import React from "react";
import "./style.css";
import cross from "../../assets/Icons/closeIcon1.png";
import Data from "../../TermsData/Terms.json";
const Terms = ({ show, setShow, onAgreeAndContinue, onDisagree }) => {
  return (
    <>
      {show ? (
        <div className="Main">
          <div className="Content">
            <div className="Container">
              <div className="Header">
                <h3>Terms & Conditions</h3>
                <button onClick={() => setShow(false)}>
                  <img src={cross} alt="" />
                </button>
              </div>
              <div id="Line"></div>
              <p className="Desc">
                This page contains important information regarding the terms and
                conditions which apply to your subscription of Compliance
                Services. The website is owned, operated and maintained by
                Secmark Consultancy Limited hereinafter referred to as
                “SecMark”, a Company incorporated under the Companies Act, 2013
                having CIN: U67190MH2011PLC220404, and having its Registered
                Office Plot No 36/227, Rdp-10, Cts-1c/1/640, Sector-6, Charkop,
                Nr.Ambamata Mandir, Kandivali-West, Mumbai – 400067,
                Maharashtra, India Please note that the information contained
                herein is subject to change without notice.
              </p>

              {Data.map((post) => {
                return (
                  <div>
                    <h5>{post.title}</h5>
                    <p className="Desc">{post.content1}</p>
                    <p className="Desc">{post.content2}</p>
                    <ul>
                      {post.lists.map((listItem) => {
                        return <li className="List">{listItem.list}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div id="Line"></div>
            <div className="Footer">
              <p>
                Last Updated : <b>24th May 2021</b>
              </p>
              <div className="ButtonClass">
                <button
                  onClick={() => {
                    onDisagree();
                    setShow(false);
                  }}
                >
                  DISAGREE
                </button>
                <button
                  id="Agree"
                  onClick={() => {
                    onAgreeAndContinue();
                    setShow(false);
                  }}
                >
                  AGREE & CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Terms;
