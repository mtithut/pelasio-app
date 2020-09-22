import React from 'react';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import Header from "../components/header";


function MyApp(props) {
  return (<>
      <Header/>
      <div className={styles.container}>
        <h1>خانه</h1>
        <h2><Link href={'/products'} className={styles.welcome}>از پلازیو خرید کنید</Link></h2>
      </div>
    </>
  );
}
export default MyApp;