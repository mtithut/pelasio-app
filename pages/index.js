import React from 'react';
import Link from "next/link";
import styles from '../styles/Home.module.css'
import withMainLayout from "../components/mainLayout";
import Routes from '../components/routes'


function MyApp(props) {
  return (<>
      <h2><Link href={Routes.products} className={styles.welcome}>از پلازیو خرید کنید</Link></h2>
    </>
  );
}

export default withMainLayout(MyApp, 'خانه');