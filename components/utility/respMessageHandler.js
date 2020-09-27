import React from "react";

export const getErrorMessage = (resp) => {
  let alertMessage = <span>خطا در ورود</span>
  if (resp && resp.error && resp.error.code) {
    if (resp.message) {
      alertMessage = <span>{resp.message}</span>
    } else if (resp.error && resp.error.data) {
      let messages = []
      Object.values(resp.error.data).map(msgs => {
        messages = messages.concat(msgs)
      })
      alertMessage = messages.map(msg => <div><span>{msg}</span></div>)
    }
  }
  return alertMessage
}