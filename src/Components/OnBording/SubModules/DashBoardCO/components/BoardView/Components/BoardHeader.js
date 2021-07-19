import React, { useState, useEffect } from 'react';
import threeDots from "../../../../../../../assets/Icons/threeDots.PNG";
import mobileSteperIcon from "../../../../../../../assets/Icons/mobileSteperIcon.png";
import "../style.css"
function CustomCard(props) {

    const defineStyle = (props) => {
        let obj = {}
        if (props && props.title === "overdue") {
            obj = {
                color: 'red',
            }
        } else if (props && props.title === "Upcoming") {
            obj = {
                color: '#1b1d21',
            }
        } else if (props && props.title === "Completed") {
            obj = {
                color: '#1b1d21'
                
            }
        } else {
            obj = {
                color: '#1b1d21',
            }
        }
        return obj;
    }

    const _capitalName = (input) => {
        var words = input.split(' ');
        var CapitalizedWords = [];
        if(input === "Pending"){
            return "Take Action"
        }else{
            words.forEach(element => {
                CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
            });
            return CapitalizedWords.join(' ');
        }
        return ""
      
    }
    return (
        <div className="">
            <div className="top-board-grid">
                <div style={defineStyle(props)} className="top-board-title-black float-left">{props && props.title && _capitalName(props.title)}</div>

            </div>
        </div>
    )
}
export default CustomCard;