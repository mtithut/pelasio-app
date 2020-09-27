import React from 'react';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import Header from "../components/header";
import {getTokenAccess} from "../components/localStorage";
import withMainLayout from "../components/mainLayout";


function MyApp(props) {
  return (<>
        <h2><Link href={'/products'} className={styles.welcome}>از پلازیو خرید کنید</Link></h2>
    </>
  );
}
export default withMainLayout(MyApp,'خانه');