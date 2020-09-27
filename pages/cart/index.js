import React, {useEffect} from "react";
import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import {bindActionCreators} from "redux";
import {cartDecrease, cartDelete, cartIncrease, cartRefresh} from "../../redux/cart/actions";
import styles from '../../styles/Home.module.css'
import CartItem from "../../components/cartItem";
import {useRouter} from "next/router";
import {selectGustTokenInfo} from "../../redux/auth/reducer";
import {getGustToken} from "../../redux/auth/actions";
import Header from "../../components/header";
import withMainLayout from "../../components/mainLayout";

function Cart(props) {
  const {
    cartInfo,
    cartIncrease,
    cartDecrease,
    cartDelete,
    cartRefresh,
    gustTokenInfo,
    getGustToken
  } = props
  const router = useRouter()

  useEffect(() => {
    if (!cartInfo)
      if (gustTokenInfo && gustTokenInfo.cart_id)
        cartRefresh(gustTokenInfo.cart_id, 'ir', 'fa')
      else getGustToken()
  }, [])

  useEffect(() => {
    if (!cartInfo)
      if (gustTokenInfo && gustTokenInfo.cart_id)
        cartRefresh(gustTokenInfo.cart_id, 'ir', 'fa')
  }, [gustTokenInfo])

  const onClickItem = (catalogId) => {
    router.push(`/products/${catalogId}`)
  }
  const increaseItem = (quantity, maxQuantity, itemId) => {
    if (cartInfo && cartInfo.unique_id && quantity < maxQuantity) {
      cartIncrease(cartInfo.unique_id, itemId)
    }
  }
  const decreaseItem = (quantity, minQuantity, itemId) => {
    if (cartInfo && cartInfo.unique_id && quantity > minQuantity) {
      cartDecrease(cartInfo.unique_id, itemId)
    }
  }
  const deleteItem = (itemId) => {
    if (cartInfo && cartInfo.unique_id) {
      cartDelete(cartInfo.unique_id, itemId)
    }
  }
  return <div className={styles.grid}>
    <div className={styles.cartItemCard}>
      {
        cartInfo && cartInfo.items ? cartInfo.items.map(item =>
          <CartItem name={item.product && item.product.name}
                    image={item.product && item.product.default_photo && item.product.default_photo.photo_file && item.product.default_photo.photo_file.xsmall}
                    price={item.price}
                    currencySymbol={cartInfo.currency && cartInfo.currency.symbol}
                    quantity={item.quantity}
                    onClick={() => onClickItem(item.catalog_unique_id)}
                    onIncrease={() => increaseItem(item.quantity, item.variation && item.variation.maximum_quantity, item.variation && item.variation.unique_id)}
                    onDecrease={() => decreaseItem(item.quantity, item.variation && item.variation.minimum_quantity, item.variation && item.variation.unique_id)}
                    onDelete={() => deleteItem(item.variation.unique_id)}/>
        ) : <h2>سبد خرید خالی است</h2>
      }
    </div>
    <div className={styles.cartPayment}>
      <h2>مبلغ قابل پرداخت : {cartInfo && cartInfo.total}</h2>
      <button disabled={!cartInfo || !cartInfo.items || !cartInfo.items.length}
              onClick={() => router.push('/cart/address')}
      > ادامه فرایدند پرداخت
      </button>

    </div>


  </div>

}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  gustTokenInfo: selectGustTokenInfo(state)
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  cartIncrease,
  cartDecrease,
  cartDelete,
  cartRefresh,
  getGustToken
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withMainLayout(Cart, 'سبد خرید شما'));