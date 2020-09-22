import styles from "../../styles/Home.module.css";
import React from "react";

export default function CartItem({name, image, price, currencySymbol, quantity, onClick, onIncrease, onDecrease, onDelete}) {
  console.log(name, image, price, currencySymbol, quantity)
  return <div className={styles.cartItemCard}>
    <div className={styles.grid}>
      <div className={styles.detailCart}>
        <img onClick={onClick} src={image}/>
      </div>
      <div className={styles.detailCart}>
        <h2>{name} </h2><h2>{price} {currencySymbol}</h2>
      </div>
      <div className={styles.detailCart}>
        <button onClick={onIncrease}>+</button>
        <span>{quantity}</span>
        <button onClick={onDecrease}>-</button>
        <button onClick={onDelete}>delete</button>
      </div>
    </div>
  </div>
}