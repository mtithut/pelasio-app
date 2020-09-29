import Header from "../../components/header";
import styles from "../../styles/Home.module.css";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import {bindActionCreators} from "redux";
import Api from "../../api";
import {getCartId, getTokenAccess} from "../../components/localStorage";
import {cartRefresh} from "../../redux/cart/actions";
import {useRouter} from "next/router";
import BankPaymentGateway from "../../components/bankPaymentGateway";
import {getErrorMessage} from "../../components/utility/respMessageHandler";
import withMainLayout from "../../components/mainLayout";
import MessageHandler from "../../components/messageHandler";


function Payment(props) {
  const {cartInfo} = props
  const router = useRouter()
  const [banks, setBanks] = useState([])
  const [selectedBank, setSelectedBack] = useState({})
  const [bankingInfo, setBankingInfo] = useState(undefined)

  const [{isSuccess, isError, message}, setAlertMessage] = useState({isSuccess: false, isError: false, message: ''})

  useEffect(() => {
    Api.getBanks()
      .then(res => {
        if (res && res.data && Array.isArray(res.data)) {
          setBanks(res.data)
          if (res.data.length) setSelectedBack(res.data[0])
        }
      })

    if (getTokenAccess() && getCartId() && !cartInfo) {
      cartRefresh(getCartId(), 'ir', 'fa')
    } else if (!getTokenAccess())
      router.push('/signup')

  }, [])
  const onPayment = () => {
    Api.requestOrders('ir', selectedBank.bank_id, cartInfo.unique_id, 0, 'payment', 1)
      .then(res => {
        res && res.data && setBankingInfo(res.data)
      })
      .catch(reason => {
        console.log('error requestOrders', reason)
        setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)})
      })
  }
  return <>

    <MessageHandler isError={isError} isSuccess={isSuccess} message={message}/>

    <div className={styles.cartGrid}>
      <div className={styles.cartItemCard}>
        <h4>تعداد محصولات {cartInfo && cartInfo.items && cartInfo.items.length}</h4>
        {cartInfo && cartInfo.items && cartInfo.items.map(item =>
          <>
            <img
              src={item.product && item.product.default_photo && item.product.default_photo.photo_file && item.product.default_photo.photo_file.xsmall}/>
            {item.product && item.product.name}
          </>
        )}
        <h4>قیمت {cartInfo && cartInfo.total}</h4>


      </div>
      <div className={styles.cartPayment}>
        <h2>مبلغ قابل پرداخت : {cartInfo && cartInfo.total}</h2>
        <button disabled={!cartInfo || !cartInfo.items || !cartInfo.items.length}
                onClick={onPayment}>پرداخت
        </button>

      </div>
      <div className={styles.cartItemCard}>
        {
          banks && banks.map((bank, index) =>
            <div key={index}>
              <input type={"radio"} id={`bank${index}`}
                     name="bank" value={bank.bank_id}
                     checked={selectedBank.bank_id == bank.bank_id}
                     onChange={(e) => setSelectedBack(bank)}/>
              <label htmlFor={`bank${index}`}>
                {bank.name} <img src={bank.logo && bank.logo.xsmall}/>
              </label>
            </div>
          )
        }
      </div>
    </div>
    {bankingInfo && <BankPaymentGateway formParameters={bankingInfo && bankingInfo.form_parameters}
                                        formInputs={bankingInfo && bankingInfo.form_inputs}/>}
  </>
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
});


const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withMainLayout(Payment,'پرداخت'));