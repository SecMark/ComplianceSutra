import React from 'react';
import "./style.css";

function CoAccount() {
    return (
        
        <div className="co-change-password-grid">
            <div className="personal-mgt-title">Change password</div>
            <div class="border-header"></div>
            <form className="">
                <div className="form-row">
                    <label className="col-form-label" for="name">Current Password:</label>
                    <input type="text" className="form-control right-input-row" placeholder="Enter your current password" name="name" />
                </div>
                <div className="form-row">
                    <label className="col-form-label" for="name">New Password:</label>
                    <input type="text" className="form-control right-input-row" placeholder="Enter 8-16 digit password" name="name" />
                </div>
                <ul class="Instruction">
                    <li>
                        <div class="green-dot"></div>
                        At least 8-16 characters—the more characters, the better
                    </li>
                    <li>
                        <div class="green-dot"></div>
                        A mixture of both uppercase and lowercase letters
                    </li>
                    <li>
                        <div class="green-dot"></div>
                        A mixture of letters and numbers
                    </li>
                </ul>
                <div className="form-row">
                    <label className="col-form-label" for="name">Confirm Password:</label>
                    <input type="text" className="form-control right-input-row" placeholder="Repeat Password" name="name" />
                </div>

            </form>  
            <div class="row aligncenter">
                     {/* <div class="col-12">
                        <div className="form-row">
                           <label className="col-form-label" for="name">Confirm password:</label>
                           <input type="text" className="form-control right-input-row" placeholder="Enter your password" name="name" />
                        </div>
                     </div> */}
                    {/* <div class="col-12">
                        <button class="btn save-changes-btn">save changes</button>
                    </div> */}
                    <div class="col-3">
                        <button class="btn save-changes-blue-btn">save password</button>
                    </div>
                    <div class="col-9 pl-0">
                        <div className="discard-label-link">Cancel</div>
                    </div>
                </div>         
            
                {/* <div class="bottom-logo-strip personal-details">
                    <div class="row aligncenter">
                        <div class="col-3">
                            <button class="btn save-changes-blue-btn">save changes</button>
                        </div>
                        <div class="col-9">
                            <div className="discard-label-link">discard changes</div>
                        </div>
                    </div>
                </div> */}
         </div>
       
    )
}


export default CoAccount;