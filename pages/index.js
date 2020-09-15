import React from 'react';
import {connect} from 'react-redux';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {isLoginSuccess} from "../redux/signup/reducer";
import Head from "next/head";

function App (props) {
    const {loginSuccess} = props
    return (
      <>
        <Head>
          <title>خانه</title>
        </Head>
        <div className={styles.container}>
          <h1>خانه</h1>
          {loginSuccess ? <h2 className={styles.welcome}>به پلازیو خوش آمدید</h2> :
            < h2>< Link href={'/signup'}>ورود</Link></h2>}
        </div>
      </>
    );
}

const mapStateToProps = state => ({
  loginSuccess: isLoginSuccess(state),
});


const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(App);