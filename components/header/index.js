import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import React, {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import {
  isLoginSuccess,
  isRefreshTokenSuccess,
  selectGustTokenInfo,
  selectLogin,
  selectUserinfo
} from "../../redux/auth/reducer";
import CustomHead from "../head";
import {useRouter} from "next/router";
import {clearUserInfo, getCartId, getExpiresTime, getTokenAccess, getUser} from "../localStorage";
import {bindActionCreators} from "redux";
import {cartRefresh, cleanCartState} from "../../redux/cart/actions";
import {getGustToken, resetLogin} from "../../redux/auth/actions";

function Header(props) {
  const {resetLogin, cartRefresh, cleanCartState, cartData, isLogin, userInfo, getGustToken, gustTokenInfo, isRefreshToken} = props
  const [user, setUserInfo] = useState(undefined)
  const [cartInfo, setCartInfo] = useState(cartData)
  const router = useRouter()

  useEffect(() => {
    const date = new Date()
    if (getExpiresTime() < date) onLogout()
    setUserInfo(userInfo || JSON.parse(getUser()))
    const token = getTokenAccess()
    if (token && getCartId()) {
      if (!cartInfo) cartRefresh(getCartId(), 'ir', 'fa')
    } else
      getGustToken()
  }, [])

  useEffect(() => {
    setUserInfo(JSON.parse(getUser()))
  }, [isRefreshToken])

  useEffect(() => {
    setCartInfo(cartData)
  }, [cartData])

  useEffect(() => {
    if ((gustTokenInfo || isRefreshToken) && getTokenAccess() && getCartId()) {
      cartRefresh(getCartId(), 'ir', 'fa')
      setUserInfo(JSON.parse(getUser()))
    }
  }, [gustTokenInfo, isRefreshToken])


  const getCartItemCount = () => {
    return cartInfo && cartInfo.items && cartInfo.items.length
  }
  const onLogout = () => {
    resetLogin()
    setCartInfo(undefined)
    setUserInfo(undefined)
    clearUserInfo()
    cleanCartState()
    getGustToken()
    router.push('/')
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
        {<Link href={'/'}> خانه</Link>}
      </div>


    </div>
  </>
}

const mapStateToProps = state => ({
  cartData: selectCartInfo(state),
  isLogin: isLoginSuccess(state),
  userInfo: selectUserinfo(state),
  gustTokenInfo: selectGustTokenInfo(state),
  isRefreshToken: isRefreshTokenSuccess(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  cartRefresh,
  cleanCartState,
  resetLogin,
  getGustToken,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);