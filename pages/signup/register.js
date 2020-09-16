import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import styles from '../../styles/Home.module.css'
import {connect} from "react-redux";
import {
  isValidEmail,
  isValidLastname,
  isValidFirstname,
  isValidPassword,
  isValidPasswordRep
} from "../../components/utility/validation";
import {
  isRegisterFailed,
  isRegisterSuccess,
  selectRegister,

} from "../../redux/signup/reducer";
import Head from "next/head";
import {bindActionCreators} from "redux";
import {register} from "../../redux/signup/actions";
import Api, {baseUrl, urls} from '../../api'


function Register(props) {
  const {registerData, registerFailed, registerSuccess, register, countries} = props
  const {data} = countries
  const router = useRouter()
  const [firstname, setFirstname] = useState(undefined)
  const [lastname, setLastname] = useState(undefined)
  const [country, setCountry] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [pass, setPass] = useState(undefined)
  const [passRep, setPassRep] = useState(undefined)
  const [validation, setValidation] = useState({
    firstname: true,
    lastname: true,
    email: true,
    pass: true,
    passRep: true
  })

  // useEffect(() => {
  //   // if (registerSuccess)
  //     // onClickGoLogin()
  // }, [
  //   registerSuccess
  // ])

  useEffect(() => {
    if (Array.isArray(data) && data.length)
      setCountry(data[0].country_id)
  }, [
    data
  ])


  const onChangeName = (event) => {
    setFirstname(event.target.value)
  }
  const onChangeLastname = (event) => {
    setLastname(event.target.value)
  }
  const onChangeCountry = (event) => {
    setCountry(event.target.value)
  }
  const onChangeEmail = (event) => {
    const value = event.target.value
    setEmail(value)
  }
  const onChangePass = (event) => {
    setPass(event.target.value)
  }
  const onChangePassRep = (event) => {
    setPassRep(event.target.value)
  }
  const onClickRegister = () => {
    if (isValidFirstname(firstname) && isValidLastname(lastname) && isValidEmail(email) && country && isValidPassword(pass) && isValidPasswordRep(pass, passRep)) {
      register && register(firstname, lastname, email, country, pass, passRep)
    }
    setValidation({
      firstname: isValidFirstname(firstname),
      lastname: isValidLastname(lastname),
      email: isValidEmail(email),
      pass: isValidPassword(pass),
      passRep: isValidPasswordRep(pass, passRep)
    })
  }
  const onClickGoLogin = () => {
    router.push('/signup')
  }

  const getErrorMessage = () => {
    let alertMessage = <span>خطا ثبت اطلاعات</span>
    if (registerData && registerData.errors && registerData.errors.error && registerData.errors.error.code) {
      if (registerData.errors.message) {
        alertMessage = <span>{registerData.errors.message}</span>
      } else if (registerData.errors.error && registerData.errors.error.data &&
        registerData.errors.error.data) {
        let messages = []
        Object.values(registerData.errors.error.data).map(msgs => {
          messages = messages.concat(msgs)
        })
        alertMessage = messages.map(msg => <div><span>{msg}</span></div>)
      }
    }
    return alertMessage
  }

  return <>
    <Head>
      <title>ثبت نام</title>
    </Head>
    <div className={styles.container}>
      <h1>حساب کاربری خود را ایجاد کنید</h1>
      <div className={styles.success} hidden={!registerSuccess}>
        <span>{(registerData.data && registerData.data.message) || 'ثبت اطلاعات با موفقیت انجام شد'}</span>
      </div>
      <div className={styles.error} hidden={!registerFailed}>
        {
          getErrorMessage()
        }
      </div>
      <div>
        <input type={'text'} value={firstname} onChange={onChangeName} placeholder={'نام'}/>
      </div>
      <div className={styles.error} hidden={validation.firstname}>
        <span>نام را وارد کنید</span>
      </div>
      <div>
        <input type={'text'} value={lastname} onChange={onChangeLastname} placeholder={'نام خانواگی'}/>

      </div>
      <div className={styles.error} hidden={validation.lastname}>
        <span>نام خانوادگی را وارد کنید</span>
      </div>

      <div>
        <input type={'text'} value={email} onChange={onChangeEmail} placeholder={'ایمیل'}/>

      </div>
      <div className={styles.error} hidden={validation.email}>
        <span>ایمیل معتبر وارد کنید</span>
      </div>
      <div>
        <select value={country} onChange={onChangeCountry} placeholder={'کشور'}>
          {
            data && data.map(country => <option key={`cty ${country.country_id}`}
                                                value={country.country_id}>{country.name}</option>)
          }
        </select>
      </div>
      <div>
        <input type={'password'} value={pass} onChange={onChangePass} placeholder={'پسورد'}/>
      </div>
      <div className={styles.error} hidden={validation.pass}>
        <span>رمز عبور معتبر وارد کنید</span>
      </div>
      <div>
        <input type={'password'} value={passRep} onChange={onChangePassRep} placeholder={'تکرار پسورد'}/>

      </div>
      <div className={styles.error} hidden={validation.passRep}>
        <span>تکرار رمز عبور معتبر وارد کنید</span>
      </div>
      <div>
        <button type={'button'} onClick={onClickGoLogin}>ورود</button>
        <button type={'button'} onClick={onClickRegister}>ثبت نام</button>
      </div>
    </div>
  </>
}

export async function getStaticProps() {
  let countries = await Api.getCountries()
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      countries,
    },
  }
}

// export default Register
const mapStateToProps = (state) => {
  console.log(state)
  return Object.assign({},
    {
      registerSuccess: isRegisterSuccess(state),
      registerFailed: isRegisterFailed(state),
      registerData: selectRegister(state),
    }
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
