import axios from "axios"
import React, { useEffect, useRef } from "react"
export const useOuterClick = (callback) => {
  const innerRef = useRef()
  const callbackRef = useRef()

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback
  })

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e)
      }
    }
  }, []) // no need for callback + innerRef dep

  return innerRef // return ref; client can omit `useRef`
}
export const isEmail = (email) => {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})\s*$/
  if (email && email.match(mailformat)) {
    return true
  }
  return false
}
export const issessionEmail = (email) => {
  let sessionData = sessionStorage.getItem("emails")
  let sessionStorageData =
    sessionData !== null ? JSON.parse(sessionData) : undefined
  let emailCondition = null

  if (sessionStorageData !== undefined) {
    if (isEmail(email) === true) {
      emailCondition = sessionStorageData.find((item) => item === email)
    }
  }

  if (typeof emailCondition === "string") {
    return true
  } else {
    return false
  }
}
