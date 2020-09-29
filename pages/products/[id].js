import Api from "../../api";
import React, {useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";
import {connect} from "react-redux";
import {selectCartInfo} from "../../redux/cart/reducer";
import {bindActionCreators} from "redux";
import {addToCart} from "../../redux/cart/actions";
import Header from "../../components/header";
import {isLoginSuccess, loginState} from "../../redux/auth/reducer";
import {useRouter} from "next/router";
import withMainLayout from "../../components/mainLayout";
import {getUser} from "../../components/localStorage";
import Routes from '../../components/routes'

function Product(props) {
  const {productRes, addToCart, isLogin} = props
  const router = useRouter()
  const [selectedVariation, setVariation] = useState(undefined)
  const [quantity, setQuantity] = useState(0)
  const [userInfo, setUserInfo] = useState(undefined)
  const [info, setInfo] = useState({
    name: '',
    photo: '',
    description: '',
    variations: [],
  })
  // console.log('product', productRes)

  useEffect(() => {
    setUserInfo(JSON.parse(getUser()))
  }, [])

  useEffect(() => {
    setUserInfo(JSON.parse(getUser()))
  }, [isLogin])

  useEffect(() => {
    initProductInfo()
  }, [productRes])

  const initProductInfo = () => {
    let photo = '', name = '', description = '', variations = []
    if (productRes && productRes.data && productRes.data.product && productRes.data.product.default_photo && productRes.data.product.default_photo.photo_file) {

      photo = productRes.data.product.default_photo
    }
    if (productRes && productRes.data && productRes.data.product) {
      name = productRes.data.product.name
      description = productRes.data.product.description
    }
    if (productRes && productRes.data && productRes.data.variations) {
      variations = productRes.data.variations
      if (variations.length) {
        setVariation(variations[0])
        setQuantity(variations[0].minimum_quantity)
      }

    }
    setInfo({name: name, description: description, photo: photo, variations: variations})

  }

  const onClickBuy = () => {
    if (!userInfo) {
      router.push(Routes.signup)
    } else if (selectedVariation && quantity)
      addToCart(selectedVariation.unique_id, quantity)
  }

  const onChangeValues = (type, value) => {
    if (type === 'Variation') {
      setVariation(value)
    } else if (type === 'Quality') {
      if (value >= selectedVariation.minimum_quantity && value <= selectedVariation.maximum_quantity)
        setQuantity(value)
    }
  }

  const getPricing = () => {
    if (selectedVariation && selectedVariation.pricing)
      return `${selectedVariation.pricing.price} ${selectedVariation.pricing.currency_symbol}`
  }


  return <>
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.catalog}>
          <img src={(info.photo && info.photo.photo_file && info.photo.photo_file.small) || ''} alt={info.name}/>
        </div>
        <div className={styles.catalog}>
          <h1>{info.name}</h1>
          <h2>{getPricing()}</h2>
          <span>{info.description}</span>
        </div>
        <div className={styles.catalog}>
          {
            info.variations && info.variations.map((variation, index) =>
              <div key={index}>
                <input type={"radio"} id={`price${index}`}
                       name="price" value={variation.unique_id}
                       checked={selectedVariation.unique_id == variation.unique_id}
                       onChange={(e) => onChangeValues('Variation', variation)}/>
                <label
                  htmlFor={`price${index}`}>{variation.color && variation.color.value}, {variation.guarantee && variation.guarantee.value}</label>
              </div>
            )
          }


        </div>


        <div className={styles.catalog}>
          <button onClick={() => onChangeValues('Quality', quantity + 1)}>+</button>
          {quantity}
          <button onClick={() => onChangeValues('Quality', quantity - 1)}>-</button>
        </div>
        <div className={styles.catalog}>
          <button disabled={!selectedVariation || !quantity || !selectedVariation.stock || !userInfo}
                  onClick={onClickBuy}>{selectedVariation && selectedVariation.stock ? 'خرید کنید' : 'ناموجود'}
          </button>
          {!userInfo && <button onClick={() => router.push(Routes.signup)}>ورود</button>}
        </div>
      </div>


    </main>
  </>
}

export async function getServerSideProps(context) {
  const {id} = context.params
  let product = await Api.getCatalogs(id, 'ir', 'fa')
  return {
    props: {
      productRes: product,
    },
  }
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  isLogin: isLoginSuccess(state),
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  addToCart
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withMainLayout(Product, 'مشخصات محصول'));