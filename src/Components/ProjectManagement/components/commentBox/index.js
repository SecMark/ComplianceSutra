import React from 'react'
import './style.css'
import { AiOutlineClose } from "react-icons/ai";
import { FiSend } from "react-icons/fi"
import eclipsphoto from "../assets/eclipsphoto.png"


function Commentbox() {

    return (
        <div className="body">
            <h1>comment</h1>
                <div className="mainbackground-comment">
                    <div className="close-button"><AiOutlineClose/></div>
                    <div className="comment-heading">Comments</div>
                    <div className="head-line"></div>

                    <div className="first-comments"></div>
                   
                    <div className="comment-name">Ajit Shah</div>
                    <div className="comment-text">
                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    </div>
                    <div className="send-time">10:59PM</div>  

                    <div className="photo-second"><img src={eclipsphoto} /></div>
                    <div className="second-comments"></div>
                    <div className="comment-reply">Keshav D</div>
                    <div className="comment-txt">
                    Lorem Ipsum is simply dummy text.
                    </div>
                    <div className="reply-time">10:59PM</div>  

                    <div className="photo-third"><img src={eclipsphoto} /></div>
                    <div className="third-comments"></div>
                    <div className="comment-reply-next">Keshav D</div>
                    <div className="commenttext">
                    galley of type and scrambled it to make a type.
                    </div>
                    <div className="reply-time-next">10:59PM</div>  
                    

                    <div className="commentbox">
                        <input type="text" name="name" placeholder="Type a comments.."/>
                    </div>
                    <div className="sendbutton">
                     <div className="sendFi"><FiSend/></div>
                    </div>
                </div>
            
        </div>
    )
}

export default Commentbox
