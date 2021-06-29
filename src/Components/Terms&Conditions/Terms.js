import React from "react";
import "./style.css";
import cross from "../../assets/Icons/closeIcon1.png";

const Terms = ({ show, setShow, closeShow }) => {
  return (
    <>
      {show ? (
        <div className="Main">
          <div className="Content">
            <div className="Container">
              <div className="Header">
                <p>Terms & Conditions</p>
                <button onClick={setShow}>
                  <img src={cross} alt="" />
                </button>
              </div>
              <div id="Line"></div>
              <p className="Desc">
                This page contains important information regarding the terms and
                conditions which apply to your subscription of CAPMTech
                Services. The website is owned, operated and maintained by
                Secmark Consultancy Limited hereinafter referred to as
                “SecMark”, a Company incorporated under the Companies Act, 2013
                having CIN: U67190MH2011PLC220404, and having its Registered
                Office Plot No 36/227, Rdp-10, Cts-1c/1/640, Sector-6, Charkop,
                Nr.Ambamata Mandir, Kandivali-West, Mumbai – 400067,
                Maharashtra, India Please note that the information contained
                herein is subject to change without notice.
              </p>
              <div>
                <h5>General terms and conditions</h5>
                <p className="Desc">
                  Before availing of CAPMTech services, the Client shall
                  complete the registration process as may be prescribed from
                  time to time. The Client shall follow the instruction given in
                  the website for registering himself as a client.
                  <br />
                  <br />
                  The Client agrees that all compliance, task management and
                  Audit decisions are based on the Client's own evaluation of
                  compliance objectives. The Client will not hold nor seek to
                  hold SecMark or any of its officers, directors, partners,
                  employees, subsidiaries, affiliates or business associates
                  liable for any non-comaplaince, cost of damage incurred by the
                  Client consequent upon relying on information, or any other
                  material/information whatsoever on the web site, literature,
                  brochure issued by SecMark or any other agency
                  appointed/authorised by SecMark.
                </p>
              </div>
              <div>
                <h5>Security precaution and password</h5>
                <p className="Desc">
                  SecMark will provide the client with a username and a password
                  which will enable him to avail of the facilities of CAPTech
                  services on platform such as website and/or application or
                  over the telephone or in any such other manner as may be
                  permitted by SecMark for availing of the services. All terms
                  regarding the use, reset and modification of such password
                  shall be governed by information on the website. Any Password
                  can be reset by the You at any point of time, by selecting the
                  ‘Forgot Password’ link under the login area. As soon as You
                  select the ‘Forgot Password’ link, a reset link is sent to
                  Your registered email ID, where the same process of setting a
                  unique password is followed.
                  <br></br>
                  <br></br>
                  The Client shall be responsible for keeping the Username and
                  Password confidential and secure and shall be solely
                  responsible for all acts and transactions done by any person
                  whosoever through SecMark CAPMTech System using the Client’s
                  Username and/or Password whether or not such person was
                  authorised to do so. The Client shall immediately inform
                  SecMark of any unauthorised use of the Client’s Username or
                  Password with full details of such unauthorised use including
                  the date of such unauthorised use, the manner in which it was
                  unauthorisedly used, the transactions effected pursuant to
                  such unauthorised use, etc.
                  <br></br>
                  <br></br>
                  The Client agrees that he shall be fully liable and
                  responsible for any and all unauthorised use and misuse of his
                  Password and/or Username and also for any and all acts.
                  <br></br>
                  <br></br>
                  Without prejudice to the provisions mentioned herein above,
                  the Client shall immediately notify SecMark in writing with
                  full details if:
                  <li>
                    He discovers or suspects unauthorised access through his
                    Username, Password or Account,
                  </li>
                  <li>
                    He notices discrepancies that might be attributable to
                    unauthorised access, he forgets his password or he discovers
                    a security flaw in our System.
                  </li>
                </p>
              </div>
              <div>
                <h5>Fees</h5>
                <p className="Desc">
                  The Client agrees to pay SecMarck any fees, GST and other
                  taxes as agreed upon and due from time to time, as applied to
                  such Client's account, transactions for the services that the
                  Client receives.
                  <br />
                  All fees and charges on SecMark’s platform are subject to
                  change from time to time. Each time there is any change with
                  respect to fees, charges SecMark would notify all Clients by
                  an email and/or SMS to their registered email ID and contact
                  number with all details, along with the date of such changes
                  being effective.
                </p>
              </div>
              <div>
                <h5>Miscellaneous</h5>
                <p className="Desc">
                  All modification to this Agreement shall be made solely at the
                  discretion of SecMark and shall be intimated to the client by
                  a suitable modification to the terms and conditions or other
                  applicable section on the website or in any other manner.
                </p>
              </div>
              <div>
                <h5>Indemnity</h5>
                <p className="Desc">
                  In the event of death or insolvency of the client, winding up
                  or liquidation, or their otherwise becoming incapable of
                  receiving our services SecMark may stop their services and the
                  client or his legal representative shall be liable for any
                  losses, costs and be entitled to any surplus which may result
                  therefrom.
                  <br />
                  The client agrees to indemnify SecMark from any loss, injury,
                  claim or any action instituted against SecMark arising from
                  the misuse of the password by any party.
                </p>
              </div>
              <div>
                <h5>Force majeure</h5>
                <p className="Desc">
                  SecMark shall not be responsible for delay or default in the
                  performance of their obligations due to contingencies beyond
                  their control, such as (including but not limited to) losses
                  caused directly or indirectly by exchange or market rulings,
                  suspension of trading, fire, flood, civil commotion,
                  earthquake, war, strikes, failure of the systems, failure of
                  the internet links or government / regulatory action.
                </p>
              </div>
              <div>
                <h5>Severence</h5>
                <p className="Desc">
                  In the event of any one or more of the provisions contained in
                  this Agreement becoming invalid, illegal or unenforceable in
                  any respect under any law for the time being in force, the
                  validity, legality and enforceability of the remaining
                  provisions contained herein shall not in any way be prejudiced
                  or affected thereto.
                </p>
              </div>
              <div>
                <h5>Refund & cancellation policy</h5>
                <p className="Desc">
                  The Refund & Cancellation policy for all payments made towards
                  our services using any mode of payment shall stand as under:\
                  <br />
                  <li>
                    In case you have paid the charges multiple times, please
                    create a ticket here and we will initiate the necessary
                    procedure to refund your money.
                  </li>
                  <br />
                  Note: The completion of the refund procedure is subject to
                  agencies such as banks, payment gateways.
                </p>
              </div>
              <div>
                <h5>Notice</h5>
                <p className="Desc">
                  All notices, correspondences or communications issued under
                  this agreement shall be served in any one or more of the
                  following modes of communications and such notice or
                  communication shall be served at the ordinary place of
                  residence and/or last known web address / residing address and
                  / or at the ordinary business address of the party to this
                  agreement such as -
                  <br />
                  <br />
                  <li>By hand</li>
                  <li>Delivery by post</li>
                  <li>By registered post</li>
                  <li>Under certificate of posting</li>
                  <li>By email or fax</li>
                  <li>
                    By affixing it on the door at the last known business or
                    residential address.
                  </li>
                  <li>
                    By oral communication to the party or on the last known
                    telephone number or on the recording machine of such number.
                  </li>
                  <li>
                    By advertising in at least one prominent daily newspaper
                    having circulation in the area where the last known business
                    or residential address of the party is situated.
                  </li>
                </p>
              </div>
            </div>
            <div id="Line"></div>
            <div className="Footer">
              <p>Last Updated : 24th May 2021</p>
              <div className="ButtonClass">
                <button>Disagree</button>
                <button id="Agree" onClick={setShow}>
                  Agree & Continue
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
