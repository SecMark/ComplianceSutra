import React, { useState, useEffect, useCallback } from "react"
import { BACKEND_BASE_URL } from "../../../../../../../../apiServices/baseurl"
import { useSelector, useDispatch, connect } from "react-redux"
import { actions as taskReportActions } from "../../../../redux/actions"
import axios, { post } from "axios"
import { withRouter } from "react-router-dom"
import TextareaAutosize from "react-textarea-autosize"
function RightSideView({
    isTaskListOpen,

    history,

}) {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()




    return (

        <div className="row ">
            <div className="col-12 right-side-bar">
                <div className="">
                    <div className="task-details-veiw">
                        <div className="task-details-header">
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default withRouter(RightSideView)
