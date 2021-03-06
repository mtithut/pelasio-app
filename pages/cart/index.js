import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
  changeCartStatus,
  selectCartInfo
} from "../../redux/cart/reducer";
import {bindActionCreators} from "redux";
import {cartDecrease, cartDelete, cartIncrease, cartRefresh} from "../../redux/cart/actions";
import styles from '../../styles/Home.module.css'
import CartItem from "../../components/cartItem";
import {useRouter} from "next/router";
import {isRefreshTokenSuccess, selectGustTokenInfo} from "../../redux/auth/reducer";
import {getGustToken, refreshToken} from "../../redux/auth/actions";
import withMainLayout from "../../components/mainLayout";
import {clearCustomerInfo, getCartId, getTokenAccess, getUser} from "../../components/localStorage";
import MessageHandler from "../../components/messageHandler";
import Routes from '../../components/routes'
import {getErrorMessage} from "../../components/utility/respMessageHandler";

function Cart(props) {
  const {
    cartInfo,
    cartIncrease,
    cartDecrease,
    cartDelete,
    changeCartStatus,
    cartRefresh,
    gustTokenInfo,
    getGustToken, refreshToken, isRefreshToken

  } = props
  const router = useRouter()
  const [{isSuccess, isWarning, isError, message}, setAlertMessage] = useState({
    isSuccess: false,
    isWarning: false,
    isError: false,
    message: ''
  })

  useEffect(() => {
    if (getUser()) refreshToken()
  }, [])

  useEffect(() => {
    if (isRefreshToken)
      if (getTokenAccess() && getCartId()) {
        cartRefresh(getCartId(), 'ir', 'fa')
      } else if (!getTokenAccess()) {
        clearCustomerInfo()
        getGustToken()
      }
  }, [isRefreshToken])

  useEffect(() => {
    const message = changeCartStatus.isSuccess ? changeCartStatus.data.message : changeCartStatus.isFailed ? getErrorMessage(changeCartStatus.data) : ''
    setAlertMessage({
      isSuccess: changeCartStatus.isSuccess,
      isError: changeCartStatus.isFailed,
      isWarning: false,
      message: message
    })
  }, [changeCartStatus])


  const onClickItem = (catalogId) => {
    router.push(`${Routes.products}/${catalogId}`)
  }
  const increaseItem = (item) => {
    let quantity = item.quantity,
      maxQuantity = item.variation && item.variation.maximum_quantity,
      itemId = item.unique_id
    if (getCartId() && quantity < maxQuantity) {
      cartIncrease(getCartId(), itemId)
    } else
      setAlertMessage({
        isSuccess: false,
        isError: false,
        isWarning: true,
        message: 'Restrictions on the number of items, maximum quantity :' + maxQuantity
      })
  }
  const decreaseItem = (item) => {
    let quantity = item.quantity,
      minQuantity = item.variation && item.variation.minimum_quantity,
      itemId = item.unique_id
    if (getCartId() && quantity > minQuantity) {
      cartDecrease(getCartId(), itemId)
    } else setAlertMessage({
      isSuccess: false,
      isError: false,
      isWarning: true,
      message: 'Restrictions on the number of items, minimum quantity :' + minQuantity
    })
  }
  const deleteItem = (itemId) => {
    if (getCartId()) {
      cartDelete(getCartId(), itemId)
    }
  }
  return <div className={styles.grid}>
    <div className={styles.cartItemCard}>
      <MessageHandler isError={isError} isWarning={isWarning} isSuccess={isSuccess} message={message}/>
      {
        cartInfo && cartInfo.items ? cartInfo.items.map(item =>
          <CartItem name={item.product && item.product.name}
                    image={item.product && item.product.default_photo && item.product.default_photo.photo_file && item.product.default_photo.photo_file.xsmall}
                    price={item.price}
                    currencySymbol={cartInfo.currency && cartInfo.currency.symbol}
                    quantity={item.quantity}
                    onClick={() => onClickItem(item.catalog_unique_id)}
                    onIncrease={() => increaseItem(item)}
                    onDecrease={() => decreaseItem(item)}
                    onDelete={() => deleteItem(item.unique_id)}/>
        ) : <h2>سبد خرید خالی است</h2>
      }
    </div>
    <div className={styles.cartPayment}>
      <h2>مبلغ قابل پرداخت : {cartInfo && cartInfo.total}</h2>
      <button disabled={!cartInfo || !cartInfo.items || !cartInfo.items.length}
              onClick={() => router.push(Routes.cartAddress)}
      > ادامه فرایدند پرداخت
      </button>

    </div>


  </div>

}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  changeCartStatus: changeCartStatus(state),
  gustTokenInfo: selectGustTokenInfo(state),
  isRefreshToken: isRefreshTokenSuccess(state),

});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  cartIncrease,
  cartDecrease,
  cartDelete,
  cartRefresh,
  refreshToken,
  getGustToken

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withMainLayout(Cart, 'سبد خرید شما'));