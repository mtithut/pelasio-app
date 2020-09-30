import React from "react";
import styles from '../../../styles/Home.module.css'

const LEN_NAME = 30
export default function ProductCard({name, logo, pricing, stock, onClick}) {
  return <div onClick={onClick} className={styles.card}>
    <img src={logo && logo.photo_file && logo.photo_file.xsmall}/>
    <span>{name.substring(0, LEN_NAME)} </span>
    <div className={styles.oldPrice}>
      {pricing && pricing.discount_percent ? pricing.price + ' ' + pricing.currency_symbol : ''}
    </div>
    <div>{pricing && pricing.discount_percent ?
      <span className={styles.error}>{pricing.discount_percent}%</span> : ''} {pricing && pricing.sale_price} {pricing && pricing.currency_symbol}</div>
    <div className={styles.error}>{!stock ? 'ناموجود' : ''}</div>
  </div>
}