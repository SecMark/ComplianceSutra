import React from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

function Disclaimer({handleClose,handleOpen,open,setOpen}) {
    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <CloseIcon onClick={handleClose} style={{cursor:"pointer"}}/>
        
          <div className="footer-model-box">
            <h2>Disclosure</h2> 
            <p>
              The site, including any content or information contained within it
              or any site linked to the site, or any product or service licensed
              or purchased through the site, is provided on an "as is" basis and
              without warranties of any kind, either express or implied,
              including, but not limited to warranties of title or
              non-infringement or warranties of merchantability and fitness for
              a particular purpose, other than those warranties which are
              implied by and incapable of exclusion, restriction or modification
              under the laws applicable to this agreement. The website is owned,
              operated and maintained by SECMARK Group. You acknowledge that any
              warranty that is provided in connection with any of the products
              or services described herein is provided solely by the owner,
              advertiser, manufacturer or supplier of that product and/or
              service, and not by SECMARK.SECMARK does not warrant that your
              access to the site and/or related services will be uninterrupted
              or error-free, that defects will be corrected, or that this site
              or the server provided herein is free of viruses or other harmful
              components. Access to and use of this site and the information
              provided herein is at your own risk and SECMARK does not undertake
              any accountability for any irregularities, viruses or damage to
              any computer that results from accessing, availing or downloading
              of any information from this site. You assume total responsibility
              and risk for your use of this site and all site-related services.
              You agree that, except as provided under the SECMARK return
              policy, SECMARK and its directors, officers, employees, agents,
              sponsors, consultants, business partners or other representatives
              ('service providers') shall not be responsible or liable for any
              direct, indirect, incidental, consequential, special, exemplary,
              punitive or any other damages (including without limitation loss
              of profits, loss or corruption of data, loss of goodwill, work
              stoppage, computer failure or malfunction, or interruption of
              business) under any contract, negligence, strict liability or any
              other theory arising out of or relating in any way with the use of
              the site or in reliance of the information available on the site,
              site-related services, or any products or services offered or sold
              or displayed on the SECMARK site. If the foregoing limitation is
              held to be unenforceable, the maximum liability of SECMARK and its
              service providers to you shall not exceed the amount of fees paid
              by you for the products or services that you have ordered through
              the site. The possibility exists that the site could include
              inaccuracies or errors. Additionally, the possibility exists that
              unauthorized additions, deletions or alterations could be made by
              third parties to the site. Although SECMARK attempts to ensure the
              highest level of integrity, correctness and authenticity of the
              site, it makes no guarantees whatsoever as to its completeness,
              correctness or accuracy. In the event that any inaccuracy arises,
              please inform SECMARK so that it can be corrected. The price and
              value of investments and the income derived from them can increase
              or decrease and you may not get back the amount you invest.
              Changes in the rate of exchange may have an adverse effect on the
              value, price and income of investments in deposits other than your
              own. Past performance is not necessarily an indicator of future
              performance. The services and investments referred to in our site
              may have tax consequences and it is important to bear in mind that
              SECMARK does not provide tax advice. The level of taxation depends
              on individual circumstances and such levels and bases of taxation
              can change. You should consult your own tax advisor in order to
              understand any applicable tax consequences. SECMARK does not make
              any personal recommendations. The information on our Internet site
              is provided solely to enable investors to make their own
              investment decisions and does not constitute a recommendation to
              buy, sell or otherwise deal in investments. The services and the
              securities we offer may not be suitable for all customers. If you
              have any doubts, you should seek advice from an independent
              financial adviser. No market analysis, research report or any
              other information, on the web site is to be construed as a
              representation with respect to shares, securities or other
              investments. You understand and agree that no joint venture,
              partnership, employment or agency relationship exists between you
              and us as a result of this agreement or on account of use of our
              web site. Price and availability of products and services offered
              on the site are subject to change without prior notice. To the
              extent that we provide information on the availability of products
              or services you should not rely on such information. SECMARK will
              not be liable for any lack of availability of products and
              services you may order through the site.
            </p>
            <h2>Disclaimer and Limitation of Liability</h2>
            <p>
              Disclaimer: SECMARK and/or any of its affiliates do not provide
              any tips, advisory, solicitation, opinions or portfolio management
              services regarding buying, selling and trading of any securities,
              directly or indirectly, in any manner. SECMARK would welcome and
              appreciate immediate notification or notice, if any person would
              come across any such tips, advisory, solicitation, opinions or
              related services regarding buying, selling and trading of any
              securities, directly or indirectly, in any manner from any person
              or platform which is believed to be or likely to be believed as
              SECMARK. Please contact info@secmark.in for any of your queries
              with regard to the same. In no event shall SECMARK be liable for
              any investments, trades or speculative activities performed by any
              person based on any such information or content and all such
              activities shall be solely at their own risk. Transactions between
              you and SECMARK shall be governed by and construed in accordance
              with the laws of India, without regard to any conflicts of laws of
              other nations. Any litigation regarding this agreement or any
              transaction between customer and SECMARK or any action at law or
              in equity arising out of or relating to these agreement or
              transaction shall be filed only in the Competent Courts of Mumbai
              alone and the customer hereby agrees, consents and submits to the
              jurisdiction of such courts for the purpose of litigating any such
              action. The Stock exchange, Mumbai is not in any manner
              answerable, responsible or liable to any person for any acts of
              omissions or commission, errors, mistakes and/or partners, agents
              associates etc., of any of the Rules, regulations, bye-laws of the
              Stock Exchange Mumbai, SEBI Act or any other laws in force from
              time to time. The Stock Exchange, Mumbai is not answerable,
              responsible or liable for any information on this website or for
              any services rendered by us, our employees and our servants.
              SECMARK or any of it’s affiliates, employees, agents or any other
              representatives would never contact you and ask you for your
              personal details such as your login information, password, Aadhaar
              OTP, bank account details and such other related information.
              Please do not provide any details to queries from calls where such
              information is asked by the caller who impersonates to be an
              affiliate of SECMARK. For reporting any such information or for
              further queries with regard to this, please contact
              info@secmark.in.
            </p>
          </div>
        </Box>
      </Modal>
    )
}

export default Disclaimer
