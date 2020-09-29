import React, {useEffect, useState} from "react";
import Api from "../../api";
import styles from "../../styles/Home.module.css";
import Header from "../../components/header";
import {selectCartInfo} from "../../redux/cart/reducer";
import {isRefreshTokenSuccess, selectGustTokenInfo, selectRefreshTokenInfo} from "../../redux/auth/reducer";
import {bindActionCreators} from "redux";
import {cartRefresh} from "../../redux/cart/actions";
import {getGustToken, refreshToken} from "../../redux/auth/actions";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {
  clearUserInfo,
  getCartId,
  getTokenAccess,
  getUser,
  setCartId, setExpiresTime,
  setTokenAccess, setUser
} from "../../components/localStorage";
import ConfirmationProfile from '../../components/confirmationProfile'
import {getErrorMessage} from "../../components/utility/respMessageHandler";
import withMainLayout from "../../components/mainLayout";
import MessageHandler from "../../components/messageHandler";

const DisplayingErrorMessagesSchemaAddress = Yup.object().shape({
  address_line_one: Yup.string()
    .required('Required'),
  title: Yup.string()
    .required('Required'),

  postal_code: Yup.string()
    .required('Required')
    .min(10, 'The postal code must be 10 characters.')
    .max(10, 'The postal code must be 10 characters.')
    .matches(/\d{10}/, 'Is not in correct format postal code'),
  // .test('len', 'Must be exactly 10 characters', val => val.length === 10),
  country: Yup.number()
    .required('Required'),
  province: Yup.number()
    .required('Required'),
  city_id: Yup.number()
    .required('Required'),
  receiver: Yup.string()
    .notRequired(),
  phone: Yup.string()
    .matches(/^9\d{9}$/, 'Is not in correct format phone.Without 0')
    .notRequired(),
  prefix: Yup.string()
    .notRequired()
});


function Address(props) {
  const {
    cartInfo,
    cartRefresh,
    refreshToken,
    isRefreshToken
  } = props
  const [selectedAddress, setSelectedAddress] = useState(undefined)
  const [addresses, setAddresses] = useState([])
  const [countries, setCountries] = useState([])
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [confirmationProfileView, setConfirmationProfileView] = useState(false)
  const [{isSuccess, isError, message}, setAlertMessage] = useState({isSuccess: false, isError: false, message: ''})

  const router = useRouter()

  useEffect(() => {
    if (!getUser() || !getTokenAccess()) router.push('/signup')
    else {

      loadAddress()
      Api.getCountries()
        .then(res => {
          if (res && res.data && Array.isArray(res.data)) {
            setCountries(res.data)
          }
        })
      Api.getProvinces(9)
        .then(res => {
          if (res && res.data && Array.isArray(res.data)) {
            setProvinces(res.data)
            res.data.length && loadCities(res.data[0].city_id)
          }
        })

      if (getCartId()) {
        cartRefresh(getCartId(), 'ir', 'fa')
      } else router.push('/cart')
    }
  }, [])

  const loadAddress = () => {
    if (getTokenAccess())
      Api.getAddresses()
        .then(res => {
          if (res && res.data && Array.isArray(res.data)) {
            setAddresses(res.data)
            res.data.length && setSelectedAddress(res.data[0].address_id)
          }
        })
  }
  const loadCities = (provinceId) => {
    Api.getCities(provinceId)
      .then(res => {
        if (res && res.data && Array.isArray(res.data)) {
          setCities(res.data)
        }
      })
  }
  const onChangeValues = (e) => {
    setSelectedAddress(e.target.value)
  }

  const onAddAddress = (values) => {
    console.log('city', values.city_id, cities)
    if (values && cities) {
      let city = cities.find(city => city.city_id == values.city_id)
      if (!city && cities.length) city = cities[0]

      values.latitude = (city && city.latitude) ? city.latitude : 35.6864
      values.longitude = (city && city.longitude) ? city.longitude : 51.4329
    }
    values.prefix = '98'
    values.phone = values.prefix + values.phone
    if (!values.receiver) {
      const user = JSON.parse(getUser())
      values.receiver = `${user.firstname} ${user.lastname}`
    }
    Api.addAddress(values.title, values.country, values.province, values.city_id, values.address_line_one,
      values.postal_code, values.latitude, values.longitude, values.phone, values.prefix, values.receiver)
      .then(res => {
        setAlertMessage({isSuccess: true, isError: false, message: res.message})
        loadAddress()
      })
      .catch(reason => setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)}))

  }
  const onDeleteAddress = (addressId) => {
    Api.deleteAddress(addressId)
      .then(res => loadAddress())
      .catch(reason => {
        setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)})
      })

  }

  const onFinalOrder = () => {
    const user = JSON.parse(getUser())
    if (getCartId() && user && user.national_code && user.phone) {
      selectedAddress && Api.selectAddressCart(getCartId(), selectedAddress, 'ir')
        .then(resp => router.push('/cart/payment'))
        .catch(reason => setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)}))

    } else {
      setConfirmationProfileView(true)
    }
  }
  const onSuccessConfirm = () => {
    refreshToken()
    setConfirmationProfileView(false)
  }

  if (confirmationProfileView)
    return <ConfirmationProfile onCancel={() => setConfirmationProfileView(false)}
                                onSuccess={onSuccessConfirm}/>
  else
    return <>
      <MessageHandler isError={isError} isSuccess={isSuccess} message={message}/>

      <div className={styles.cartGrid}>
        <div className={styles.cartItemCard}>
          <Formik
            initialValues={{
              title: undefined,
              address_line_one: undefined,
              country: 9,
              province: provinces && provinces.length && provinces[0].city_id,
              city_id: (cities && cities.length) ? cities[0].city_id : undefined,
              postal_code: undefined,
              phone: undefined,
              receiver: undefined
            }}
            validationSchema={DisplayingErrorMessagesSchemaAddress}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                setSubmitting(false);
                onAddAddress(values)
              }, 400);
            }}
          >
            {({isSubmitting}) => (
              <Form onChange={(e) => {
                if (e.target.name === 'province') loadCities(e.target.value)
              }}>
                <div className={styles.cartGrid}>
                  <div className={styles.cartItem}>
                    <Field name="title" placeholder={'عنوان'}/>
                    <ErrorMessage name="title" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field as="select" name="country" placeholder={'کشور'} value={9} disabled>
                      {
                        countries && countries.map(country => <option key={`con ${country.country_id}`}
                                                                      value={country.country_id}>{country.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="country" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field as="select" name="province" placeholder={'استان'}
                      /* onChange={value => loadCities(value)}*/>
                      {
                        provinces && provinces.map(province => <option key={`pro ${province.city_id}`}
                                                                       value={province.city_id}>{province.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="province" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field as="select" name="city_id" placeholder={'شهر'}>
                      <option key={'city'} value={0}></option>
                      {
                        cities && cities.map(city => <option key={`cty ${city.city_id}`}
                                                             value={city.city_id}>{city.name}</option>)
                      }
                    </Field>
                    <ErrorMessage name="city_id" component="div" className={styles.error}/>
                  </div>

                  <div className={styles.cartItem}>
                    <Field name="address_line_one" placeholder={'آدرس'}/>
                    <ErrorMessage name="address_line_one" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field name="postal_code" placeholder={'کدپستی'}/>
                    <ErrorMessage name="postal_code" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field name="receiver" placeholder={'گیرنده'}/>
                    <ErrorMessage name="receiver" component="div" className={styles.error}/>
                  </div>
                  <div className={styles.cartItem}>
                    <Field name="phone" placeholder={'شماره مبایل'}/>
                    <ErrorMessage name="phone" component="div" className={styles.error}/>
                  </div>

                  <div className={styles.cartItem}>
                    <button type={'submit'} disabled={isSubmitting}>ذخیره</button>
                  </div>
                </div>


              </Form>
            )
            }
          </Formik>
        </div>
        <div className={styles.cartPayment}>
          <h2>مبلغ قابل پرداخت : {cartInfo && cartInfo.total}</h2>
          <button disabled={!cartInfo || !cartInfo.items || !cartInfo.items.length}
                  onClick={onFinalOrder}>نهایی سازی سفارش
          </button>

        </div>

        <div className={styles.cartItemCard}>
          {
            addresses && addresses.map((address, index) =>
              <div key={index} className={styles.addressItem}>
                <input type={"radio"} id={`address${index}`}
                       name="address" value={address.address_id}
                       checked={selectedAddress == address.address_id}
                       onChange={onChangeValues}/>
                <label htmlFor={`address${index}`}>
                  <h3>{address.title}:</h3>
                  آدرس:{address.country.name}, {address.province.name}, {address.city.name}: {address.address_line_one}<br/>
                  کدپستی:{address.postal_code} تلفن: {address.phone} گیرنده: {address.receiver}<br/>
                  <button onClick={() => onDeleteAddress(address.address_id)}>delete</button>
                  {/*<button>edit</button>*/}
                </label>
              </div>
            )
          }

        </div>


      </div>
      <div>

      </div>
    </>
}

const mapStateToProps = state => ({
  cartData: selectCartInfo(state),
  gustTokenInfo: selectGustTokenInfo(state),
  isRefreshToken: isRefreshTokenSuccess(state)
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  getGustToken,
  cartRefresh,
  refreshToken
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withMainLayout(Address, 'تکمیل فرایند خرید'));
