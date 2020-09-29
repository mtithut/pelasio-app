import React from "react";

export default function BankPaymentGateway({formParameters, formInputs}) {
  let submitElement = React.createRef();
  setTimeout(() => {
    submitElement && submitElement.current && submitElement.current.click()
    console.log('BankPaymentGateway')
  }, 500);


  return formParameters && formInputs && <form
    action={formParameters && formParameters.action}
    method={formParameters && formParameters.method}
    target={formParameters && formParameters.target}>
    {
      formInputs && Object.entries(formInputs).map(([key, value]) =>
        <input name={key} hidden type='text' value={value}/>
      )
    }
    <input ref={submitElement} hidden type="submit"/>
  </form>
}

