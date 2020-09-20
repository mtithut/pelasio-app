import React from "react";
import styles from '../../../styles/Home.module.css'

const LEN_NAME = 30
export default function ProductCard({name, logo, pricing, onClick}) {
  return <div onClick={onClick} className={styles.card}>
    <img src={logo && logo.photo_file && logo.photo_file.xsmall}/>
    <span>{name.substring(0, LEN_NAME)} </span>
    <div>{pricing && pricing.price} {pricing && pricing.currency_symbol}</div>
  </div>
}