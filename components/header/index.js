import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import React, {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import {
  isLoginSuccess,
  isRefreshTokenSuccess, loginState,
  selectGustTokenInfo,
  selectLogin,
  selectUserinfo
} from "../../redux/auth/reducer";
import CustomHead from "../head";
import {useRouter} from "next/router";
import {
  clearCustomerInfo,
  getCartId,
  getExpiresTime,
  getTokenAccess,
  getUser,
  removeCartId,
  setCartId
} from "../localStorage";
import {bindActionCreators} from "redux";
import {cartRefresh, cleanCartState} from "../../redux/cart/actions";
import {cleanLoginState, getGustToken, refreshToken} from "../../redux/auth/actions";
import {doRefreshToken, isExpireToken} from "../utility/validation";
import Routes from '../../components/routes'

function Header(props) {
  const {cleanLoginState, cartRefresh, cleanCartState, cartInfo, isLogin, userInfo, getGustToken, gustTokenInfo, refreshToken, isRefreshToken} = props
  const [user, setUserInfo] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    if (isExpireToken()) {
      onLogout()
    } else if (doRefreshToken()) {
      alert('doRefreshToken')
      refreshToken()
    }

    setUserInfo(userInfo || JSON.parse(getUser()))


    if (getTokenAccess() && getCartId()) {
      if (!cartInfo && getCartId() && router.pathname !== Routes.cartAddress && router.pathname !== Routes.cartPayment)
        cartRefresh(getCartId(), 'ir', 'fa')
    } else
      !getTokenAccess() && getGustToken()
  }, [])

  useEffect(() => {
    if (gustTokenInfo || isRefreshToken) {
      console.log('header2')
      if (!cartInfo && getCartId() && router.pathname !== Routes.cartPayment)
        cartRefresh(getCartId(), 'ir', 'fa')
      setUserInfo(JSON.parse(getUser()))
    }
  }, [gustTokenInfo, isRefreshToken])

  useEffect(() => {
    if (cartInfo && parseInt(getCartId()) !== cartInfo.unique_id && getUser()) {
      refreshToken()
    }
  }, [cartInfo])

  const onLogout = () => {
    // setCartInfo(undefined)
    setUserInfo(undefined)
    clearCustomerInfo()
    cleanLoginState()
    cleanCartState()
    getGustToken()

    if ([Routes.cart, Routes.cartAddress, Routes.cartPayment].includes(router.pathname)) {
      router.push(Routes.cart)
    }
  }

  const getCartItemCount = () => {
    return cartInfo && cartInfo.items && cartInfo.items.length
  }

  const getUserName = () => {
    return (user && user.firstname && user.lastname) ? `${user.firstname} ${user.lastname}` : ''
  }

  return <>
    <CustomHead/>
    <div className={styles.header}>
      <div>
        <Link href={'/cart'}>
          <span>
          سبد خرید<span className={styles.cartNumber}>{getCartItemCount()}</span>
          </span>
        </Link>
      </div>

      <div>
        {user ? <><span>{getUserName()}</span>
          <button onClick={onLogout}>logout</button>
        </> : <Link href={'/signup'}> ورود</Link>}
      </div>


      <div>
        {<Link href={'/products'}> محصولات پلازیو </Link>}
      </div>

      <div>
        {<Link href={'/'}> خانه</Link>}
      </div>


    </div>
  </>
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  isLogin: isLoginSuccess(state),
  userInfo: selectUserinfo(state),
  gustTokenInfo: selectGustTokenInfo(state),
  isRefreshToken: isRefreshTokenSuccess(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  cartRefresh,
  cleanCartState,
  cleanLoginState,
  refreshToken,
  getGustToken,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);