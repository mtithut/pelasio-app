import React, {useEffect, useState} from "react";
import Api from "../../api";
import styles from "../../styles/Home.module.css";
import Header from "../../components/header";
import {selectCartInfo} from "../../redux/cart/reducer";
import {selectGustTokenInfo} from "../../redux/auth/reducer";
import {bindActionCreators} from "redux";
import {cartRefresh} from "../../redux/cart/actions";
import {getGustToken} from "../../redux/auth/actions";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getCartId, getTokenAccess} from "../../components/LocalStorage";

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
    .matches(/9\d{9}/, 'Is not in correct format phone')
    .notRequired(),
  prefix: Yup.string()
    .notRequired()
});


function Address(props) {
  const {
    cartInfo,
    gustTokenInfo,
    getGustToken
  } = props
  const [selectedAddress, setSelectedAddress] = useState([])
  const [addresses, setAddresses] = useState([])
  const [countries, setCountries] = useState([])
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])

  const router = useRouter()

  useEffect(() => {

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

    if (getTokenAccess() && getCartId()) {
      cartRefresh(getCartId(), 'ir', 'fa')
    } else getGustToken()
  }, [])

  useEffect(() => {
    if (getTokenAccess()) {
      getCartId() && cartRefresh(getCartId(), 'ir', 'fa')
      loadAddress()
    }
  }, [gustTokenInfo])

  const loadAddress = () => {
    if (getTokenAccess())
      Api.getAddresses()
        .then(res => {
          if (res && res.data && Array.isArray(res.data)) {
            setAddresses(res.data)
            res.data.length && setSelectedAddress(res.data[0])
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
  const onChangeValues = (type, value) => {
    if (type === 'address') {
      setSelectedAddress(value)
    }
  }

  const onAddAddress = (values) => {
    console.log('add address')
    if (values && values.city_id && cities) {
      const city = cities.find(city => city.city_id === values.city_id)
      values.latitude = city.latitude || 35.6864
      values.longitude = city.longitude || 51.4329
    }
    values.prefix = '98'
    Api.addAddress(values.address_line_one, values.city_id, values.country, values.latitude,
      values.longitude, values.phone, values.postal_code, values.prefix, values.province,
      values.receiver, values.title)
      .then(value => loadAddress())

  }

  return <div
    // className={styles.container}
  >
    <Header/>
    <h2>افزودن آدرس</h2>
    <div className={styles.addressGrid}>
      <div className={styles.cartItemCard}>
        <Formik
          initialValues={{
            title: undefined,
            address_line_one: undefined,
            country: 9,
            province: provinces && provinces.length && provinces[0].city_id,
            city_id: cities && cities.length && cities[0].city_id,
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
            <Form>
              <div className={styles.addressGrid}>
                <div className={styles.addressItem}>
                  <Field name="title" placeholder={'عنوان'}/>
                  <ErrorMessage name="title" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field as="select" name="country" placeholder={'کشور'} value={9} disabled>
                    {
                      countries && countries.map(country => <option key={`con ${country.country_id}`}
                                                                    value={country.country_id}>{country.name}</option>)
                    }
                  </Field>
                  <ErrorMessage name="country" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field as="select" placeholder={'استان'}
                         onSelect={value => loadCities(value)}>
                    {
                      provinces && provinces.map(province => <option key={`pro ${province.city_id}`}
                                                                     value={province.city_id}>{province.name}</option>)
                    }
                  </Field>
                  <ErrorMessage name="province" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field as="select" name="city_id" placeholder={'شهر'}>
                    {
                      cities && cities.map(city => <option key={`cty ${city.city_id}`}
                                                           value={city.city_id}>{city.name}</option>)
                    }
                  </Field>
                  <ErrorMessage name="city_id" component="div" className={styles.error}/>
                </div>

                <div className={styles.addressItem}>
                  <Field name="address_line_one" placeholder={'آدرس'}/>
                  <ErrorMessage name="address_line_one" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field name="postal_code" placeholder={'کدپستی'}/>
                  <ErrorMessage name="postal_code" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field name="receiver" placeholder={'گیرنده'}/>
                  <ErrorMessage name="receiver" component="div" className={styles.error}/>
                </div>
                <div className={styles.addressItem}>
                  <Field name="phone" placeholder={'شماره مبایل'}/>
                  <ErrorMessage name="phone" component="div" className={styles.error}/>
                </div>

                <div className={styles.addressItem}>
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
        <button disabled={!cartInfo || !cartInfo.items || !cartInfo.items.length}>نهایی سازی سفارش</button>

      </div>

      <div className={styles.cartItemCard}>
        {
          addresses && addresses.map((address, index) =>
            <div key={index}>
              <input type={"radio"} id={`address${index}`}
                     name="address" value={address.address_id}
                     checked={selectedAddress.address_id == address.address_id}
                     onChange={(e) => onChangeValues('address', address)}/>
              <label htmlFor={`address${index}`}>
                <h3>{address.title}, {address.address_line_one}, {address.postal_code}, {address.postal_code}, {address.phone}, {address.receiver}</h3>
                <button>delete</button>
                <button>edit</button>
              </label>
            </div>
          )
        }

      </div>


    </div>
    <div>

    </div>
  </div>
}

const mapStateToProps = state => ({
  cartInfo: selectCartInfo(state),
  gustTokenInfo: selectGustTokenInfo(state)
});


const mapDispatchToProps = (dispatch) => bindActionCreators({
  getGustToken
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Address);
