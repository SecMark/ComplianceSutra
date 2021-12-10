import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PrivacyPolicy({
  handleClosePrivacy,
  handleOpenPrivacy,
  openPrivacy,
  setOpenPrivacy,
}) {
  return (
    <Modal
      open={openPrivacy}
      onClose={handleClosePrivacy}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon onClick={handleClosePrivacy} style={{ cursor: "pointer" }} />

        <div className="footer-model-box">
          <h2>Privacy Policy</h2>
          <h5>
            TERMS AND CONDITIONS FOR USING WEBSITE (www.compliancesutra.com)
          </h5>
          <p>
            In the course of using this website or any of the websites under the
            ‘Compliance Sutra / SecMark’ domain or availing the products and
            services vide the online application forms and questionnaires,
            online consents and such other details required from time to time on
            any of Compliance Sutra / SecMark’ (and/or its affiliates) web
            platforms or mobile applications, Compliance Sutra / SecMark and/or
            its affiliates may become privy to some of Your personal
            information, including which may or may not be of confidential
            nature. We strongly committed to protecting the privacy of our
            users/clients and has taken all necessary and reasonable measures to
            protect the confidentiality of any customer information. For the
            purpose of these Privacy Policy, wherever the context so mentions
            “Covered Persons”, "Client", "You" or "Your”, it shall mean any
            natural or legal person who has visited this website/platform and/or
            has agreed to or has enquired availing various services / product
            offered by US (also defined as “Covered Persons”). We allows any
            person to use/visit/browse the website without registering on the
            website. The term "We", "Us", "Our" and "Team Compliance Sutra /
            SecMark" shall mean SecMark.
          </p>
          <h2>Scope of this Policy</h2>
          <p>
            Business requires regular compliances, audit, operations and
            processes to be carried out at periodical intervals. SecMark enables
            you to manage these through its online solution that allows you to
            create processes, workflows, tasks and activities to manage and
            monitor your business. Stop missing deadlines and have all business
            tasks and activities within at once place with stipulated timelines.
            Any natural or legal person who has visited the SecMark
            website/platform and/or the mobile application, and/or who may or
            may not have further agreed to avail various services of SecMark or
            initiate the process of availing services of SecMark shall come
            under the purview of the scope of this Privacy Policy.
          </p>
          <h2>Collection and use of you personal information</h2>
          <p>
            SecMark may or may not collect your Personal Information to provide
            services on its web based platform or mobile application. While
            availing various services us, you may be asked for certain Sensitive
            Personal Data or Information (as defined under the Information
            Technology Act, 2000) to complete your on boarding. We, may or may
            not, request for sensitive information from you at the time of on
            boarding, which would include but not be limited to,
            <ol>
              <li>setting a password;</li>
              <li>
                financial information such as Bank account or credit card or
                debit card or other payment instrument details;
              </li>
              <li>
                information such as name, contact number, Email ID, Company
                Details, PAN, GST Number, Licenses, Sub Licenses
              </li>
            </ol>
            All such information would be for the purpose providing you current
            services,, keeping you updated of our products and services relevant
            to you, information pertaining to our services you’ve subscribed to,
            and for any legal and regulatory / audit purposes. We would save
            such information as required by the law, for the purpose of offering
            you our services, and for such further regulatory, audit, and
            business purposes. We collect Personal Information from you only
            when you voluntarily use the services provided by us, and/or enquire
            to begin an association with SecMark and/or complete the process of
            availing our services. With regard to security, we respect all
            information provided to us, and take all reasonable steps towards
            protection of the same. We have implemented technology and policies,
            with the objective of protecting your privacy from unauthorized
            access and improper use, and periodically review the same. We
            maintain procedural safeguards to protect the confidentiality and
            security of personally identifiable information transmitted to us.
          </p>
          <h2>Collection and use of your non-personal information</h2>
          <p>
            We may from time to time collect information, i.e. Non-personal
            information which cannot be used to identify you personally, while
            You are using the website or mobile application. We may from time to
            time collect information such as Non-personal information such as IP
            (internet protocol) addresses, browser types, the name of your ISP
            (internet service provider), information about a third party
            link/URL from where You arrive to our website/mobile application,
            which pages/URLs do You click on the our website / mobile
            application, and the amount of time spent on each.
          </p>
          <h2>Usage of Cookies</h2>
          <p>
            We may from time to time use cookies. Cookies are small data files
            that a website stores on Your computer. We may use persistent
            cookies which are permanently placed on your computer to store
            non-personal (Browser, ISP, OS, Clickstream information etc) and
            profiling information (age, gender, income etc). While cookies have
            unique identification nos, personal information (name, a/c no,
            contact nos etc) shall not be stored on the cookies. We will use the
            information stored in the cookies to improve Your browsing
            experience on our website, by throwing up relevant content where
            possible. We will also use the cookies to store visitor preferences
            to ease visitor navigation on the site.
          </p>

          <h2>Disclosure and transfer of collected information</h2>
          <p>
            SecMark does not share any of your information with third parties
            except:
            <ol>
              <li>
                with respect to providing the information or services that you
                have requested earlier,
              </li>
              <li>
                or with your express permission for sharing such information, or
              </li>
              <li>
                with intermediaries/applications who require such information as
                per regulatory requirements and procedure laid down by
                SEBI/Exchanges.
              </li>
            </ol>
            Under no circumstances will we sell or rent your personal
            information to anyone, for any reason, at any time.
          </p>
          <h2>Disclosure for regulatory compliances:</h2>
          <p>
            We will share your information with judicial, administrative and
            regulatory entities to comply with any legal and regulatory
            requirements.
          </p>
          <h2>Disclosures with your prior consent</h2>
          <p>
            : If, at any time, you choose to utilise the integrated services of
            third party service partners through us, we will share your
            information with these third party service partners with your prior
            consent.
          </p>
          <h2>Disclosure for provision of services:</h2>
          <p>
            We will share your information with third party vendors of SecMark
            as necessary for the provision of services. Authorized third party
            vendors are bound by the same standards of data security practices
            and procedures as we are under law and contract. They are subject to
            the same penalties as we are for the unauthorised disclosure of your
            personal information. You may refuse to accept cookies by activating
            the setting on your browser which allows you to refuse the setting
            of cookies. However, if you select this setting you may be unable to
            access certain parts of our website. Unless you have adjusted your
            browser setting so that it will refuse cookies, our system will
            issue cookies when you log on to our site. After giving a written
            notice, a user, who is subject to GDPR, shall have the right to
            receive Personal Information and Non-Personal Information, which is
            provided to us during the usage of our services, such that, this
            information may be used by another entity which is technically
            feasible by all parties to the maximum extent possible. For sending
            across any notice pertaining to removal or requesting to receive all
            such Personal Information and Non Personal Information, such that,
            this information may be transferred to another entity/controller of
            such data as per the GDPR, all subject users are required to write
            to “reachus@secmark.in”.
          </p>
          <h2>Security</h2>
          <p>
            Our hosting services and servers maintain its systems in accordance
            with industry standards and best practices to reasonably secure the
            information of its customers, such as using SSL encryption in
            certain places to prevent eavesdropping, and employing up-to-date
            software on the server. However, no data transmission over the
            Internet can be guaranteed to be 100% secure. “Perfect security”
            does not exist on the Internet, and therefore You use the website
            and mobile application at your own risk. Your data is transmitted
            between your device and our servers using HTTPS protocol for
            encryption. HTTPS is the technology used to create secure
            connections for your web browser, and is indicated by a padlock icon
            in your browser. We follows industry best practices, using open and
            known principles when transferring and storing your data. We believe
            the biggest threat to the security and privacy of your data is if
            someone gains access to any of your devices. Remember to keep your
            password safe and secret to prevent unauthorised access to your
            account. If you think that the security of your account has been
            compromised, change your password and contact us immediately for
            further assistance.
          </p>
          <h2>Correction/Updating or Access to Personal Information</h2>
          <p>
            In case of any changes with respect to any of your information,
            especially Personal Information has been changed or in case you
            would not like to continue the services provided by us, then you
            would be required to either update your Personal Information or
            unsubscribe from any updates / information with respect to
            notifications on the products/services that you had earlier utilised
            or enquired upon at SecMark.
          </p>
          <h1>Subject to Change</h1>
          <p>
            This Privacy Policy is subject to change and may be updated or
            revised from time to time, without any prior notification to the
            User, at the sole discretion of SecMark. It is the responsibility of
            the User to periodically review the Privacy Policy to determine
            whether there have been any revisions or updates. The last updated
            date of the Policy has been mentioned above for the reference of the
            User.
          </p>
          <h2>Proprietary Rights</h2>
          <p>
            This website and all information and materials on this website are
            protected by copyright and trademark laws and other intellectual
            property laws, and any unauthorized use of any information and
            materials on this website may violate laws. These terms and
            conditions are not intended to, and do not, transfer or grant any
            rights in or to this website or the information and materials on
            this website other than those which are specifically described in
            these terms and conditions, and all rights not expressly granted in
            these terms and conditions are not granted to you and are
            exclusively reserved with SecMark. If you do not agree with the
            terms of this Privacy Policy or any changes made to this Policy,
            please stop using all products and services provided by SecMark
            immediately and write to us at info@secmark.in.
          </p>
        </div>
      </Box>
    </Modal>
  );
}

export default PrivacyPolicy;
