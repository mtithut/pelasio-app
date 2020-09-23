import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import React, {useEffect, useState} from "react";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import {isLoginSuccess, selectGustTokenInfo, selectLogin, selectUserinfo} from "../../redux/auth/reducer";
import CustomHead from "../head";
import {useRouter} from "next/router";
import {clearUserInfo, getCartId, getTokenAccess, getUser} from "../LocalStorage";
import {bindActionCreators} from "redux";
import {cartRefresh} from "../../redux/cart/actions";
import {getGustToken, resetLogin} from "../../redux/auth/actions";

function Header(props) {
  const {resetLogin, cartRefresh, cartInfo, isLogin, userInfo, getGustToken, gustTokenInfo} = props
  const [user, setUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setUser(userInfo || JSON.parse(getUser()))
    }, 400)

    const token = getTokenAccess()
    if (token) {
      if (token && getCartId() && !cartInfo) cartRefresh(getCartId(), 'ir', 'fa')
    } else
      getGustToken()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setUser(userInfo || JSON.parse(getUser()))
    }, 400)
    if (gustTokenInfo && getCartId() && !cartInfo) cartRefresh(getCartId(), 'ir', 'fa')
  }, [gustTokenInfo])

  const getCartItemCount = () => {
    return cartInfo && cartInfo.items && cartInfo.items.length
  }
  const onLogout = () => {
    resetLogin()
    clearUserInfo()
    getGustToken()
    router.push('/')
  }

  const getUserName = () => {

    // const user = userInfo || JSON.parse(getUser())

    console.log('user', user)
    return (user && user.firstname && user.lastname) ? `${user.firstname} ${user.lastname}` : ''
  }

  return <>
    <CustomHead/>
    <div className={styles.header}>
      <div>
        {user ? <><span>{getUserName()}</span>
          <button onClick={onLogout}>logout</button>
        </> : <Link href={'/signup'}> ورود</Link>}
      </div>
      <div>
        {<Link href={'/'}> خانه</Link>}
      </div>

      <div>
        <Link href={'/cart'}>
          <span>
          سبد خرید<span className={styles.cartNumber}>{getCartItemCount()}</span>
          </span>
        </Link>
      </div>


    </div>
  </>
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  isLogin: isLoginSuccess(state),
  userInfo: selectUserinfo(state),
  gustTokenInfo: selectGustTokenInfo(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  cartRefresh,
  resetLogin,
  getGustToken
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);