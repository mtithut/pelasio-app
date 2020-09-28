import styles from "../../styles/Home.module.css";
import React from "react";

export default function MessageHandler({isSuccess = false, isWarning = false, isError = false, message = ''}) {
  return <>
    <div className={styles.success} hidden={!isSuccess}>
      <h5>{message}</h5>
    </div>
    <div className={styles.error} hidden={!isError}>
      <h5>{message}</h5>
    </div>
    <div className={styles.warning} hidden={!isWarning}>
      <span>{message}</span>
    </div>
  </>
}