import React, { useState, useEffect } from 'react';

const ProgressBar = (props) => {
    const {  completed } = props;
    const [progressPercentage, setProgressPercentage] = useState("10");
    useEffect(() => {
        if (completed === 1) {
            setProgressPercentage("15")
        } else if (completed === 2) {
            setProgressPercentage("35")
        }
        else if (completed === 3) {
            setProgressPercentage("60")
        }
        else if (completed === 4) {
            setProgressPercentage("100")
        }
    }, [props,completed]);

    const containerStyles = {
        height: '4px',
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 0,
        position: 'fixed',
        bottom: 0
    }

    const fillerStyles = {
        height: '100%',
        width: `${progressPercentage}%`,
        backgroundColor: '#8301f5',
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    return (
        <div style={containerStyles}>
            <div  className="progressbar-filled" style={fillerStyles}>
            </div>
        </div>
    );
};

export default ProgressBar;

