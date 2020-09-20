import React from 'react';
import {connect} from 'react-redux';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {isLoginSuccess} from "../redux/signup/reducer";
import CustomHead from "../components/head";

function App(props) {
  const {loginSuccess} = props
  return (
    <>
      <CustomHead title={'پلازیو ، پلتفرم خرید و فروش اینترنتی کالا در ایران و خاورمیانه'}/>
      <div className={styles.container}>
        <h1>خانه</h1>
        {
          loginSuccess ? <Link href={'/products'} className={styles.welcome}>از پلازیو خرید کنید</Link> :
            < h2>< Link href={'/signup'}>ورود</Link></h2>
        }

      </div>

    </>
  );
}

const mapStateToProps = state => ({
  loginSuccess: isLoginSuccess(state),
});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);