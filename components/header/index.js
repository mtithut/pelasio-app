import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import React from "react";
import styles from '../../styles/Home.module.css'
import Link from "next/link";
import {isLoginSuccess, selectLogin, selectUserinfo} from "../../redux/auth/reducer";
import CustomHead from "../head";
import {useRouter} from "next/router";

function Header(props) {
  const {cartInfo, isLogin, userInfo} = props
  const router = useRouter()

  const getCartItemCount = () => {
    return cartInfo && cartInfo.items && cartInfo.items.length
  }

  const getUserName = () => {
    return (userInfo && userInfo.firstname && userInfo.lastname) ? `${userInfo.firstname} ${userInfo.lastname}` : ''
  }
  const goToCarts = () => {
    if (getCartItemCount()) router.push('/cart')
  }
  return <>
    <CustomHead/>
    <div className={styles.header}>
      <div>
        {isLogin ? <span>{getUserName()}</span> : <Link href={'/signup'}> ورود</Link>}
      </div>
      <div>
        {<Link href={'/'}> خانه</Link>}
      </div>

      <div onClick={goToCarts}>
        سبد خرید<span className={styles.cartNumber}>{getCartItemCount()}</span>
      </div>


    </div>
  </>
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  isLogin: isLoginSuccess(state),
  userInfo: selectUserinfo(state)
});

export default connect(mapStateToProps, null)(Header);