import Header from "../header";
import React from "react";
import styles from "../../styles/Home.module.css";

export default function withMainLayout(WrappedComponent, title = '') {
  return (props) => {
    return (<div>
      <Header/>
      <div className={styles.container}>
        <h2>{title}</h2>
        <WrappedComponent {...props}/>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://www.pelazio.com/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by Pelazio
          <img src="/pelazio/logo.png" alt="pelazio Logo" className={styles.logo}/>
        </a>
      </footer>
    </div>)

  }
}