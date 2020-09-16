import React, {useEffect, useState} from "react";
import Router ,{useRouter} from 'next/router';
import styles from '../../styles/Home.module.css'
import {connect} from "react-redux";
import {isValidEmail, isValidPassword} from "../../components/utility/validation";
import {bindActionCreators} from "redux";
import {login} from "../../redux/signup/actions";
import {
  isLoginFailed,
  isLoginSuccess,
  selectLogin,
} from "../../redux/signup/reducer";
import Head from "next/head";


function Login(props) {
  const {LoginData, loginSuccess, loginFailed, login} = props
  console.log('status', LoginData)
  const router = useRouter()
  const [user, setUser] = useState(undefined)
  const [pass, setPass] = useState(undefined)
  const [validation, setValidation] = useState({user: true, pass: true})

  useEffect(() => {
    if (loginSuccess) {
      router.push('/')
    }
  }, [loginSuccess])

  const onChangeUser = (event) => {
    const value = event.target.value
    setUser(value)
  }
  const onChangePass = (event) => {
    const value = event.target.value
    setPass(value)
  }
  const onClickRegister = () => {
    router.push('/signup/register')
  }
  const onClickLogin = () => {
    if (user && isValidEmail(user) && pass && isValidPassword(pass)) {
      login(user, pass)
      //call login
    }
    setValidation({user: isValidEmail(user), pass: isValidPassword(pass)})

  }
  const getErrorMessage = () => {
    let alertMessage = <span>خطا در ورود</span>
    if (LoginData && LoginData.errors && LoginData.errors.error && LoginData.errors.error.code) {
      if (LoginData.errors.message) {
        alertMessage = <span>{LoginData.errors.message}</span>
      } else if (LoginData.errors.error && LoginData.errors.error.data &&
        LoginData.errors.error.data) {
        let messages = []
        Object.values(LoginData.errors.error.data).map(msgs => {
          messages = messages.concat(msgs)
        })
        alertMessage = messages.map(msg => <div><span>{msg}</span></div>)
      }
    }
    return alertMessage
  }

  return <>
    <Head><title>ورود</title></Head>
    <div className={styles.container}>
      <h1>ورود به حساب کاربری</h1>
      <div className={styles.success} hidden={!loginSuccess}>
        <span>{(LoginData.data && LoginData.data.message) || 'ورود با موفقیت انجام شد'}</span>
      </div>
      <div className={styles.error} hidden={!loginFailed}>
        <span>{getErrorMessage()}</span>
      </div>
      <div>
        <input type={'email'} value={user} onChange={onChangeUser} placeholder={'ایمیل'}/>
      </div>
      <div className={styles.error} hidden={validation.user}>
        <span>نام کاربری معتبر وارد کنید</span>
      </div>
      <div>
        <input type={'password'} value={pass} onChange={onChangePass} placeholder={'پسورد'}/>
      </div>
      <div className={styles.error} hidden={validation.pass}>
        <span>رمز عبور معتبر وارد کنید</span>
      </div>
      <div>
        <button type={'button'} onClick={onClickRegister}>ثبت نام</button>
        <button
          // disabled={!isValidEmail(user) || !isValidPassword(pass)}
          type={'button'}
          onClick={onClickLogin}>ورود
        </button>
      </div>
    </div>
  </>
}

const mapStateToProps = (state) => {
  console.log(state)
  return Object.assign({},

    {
      loginSuccess: isLoginSuccess(state),
      loginFailed: isLoginFailed(state),
      LoginData: selectLogin(state),
    }
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);