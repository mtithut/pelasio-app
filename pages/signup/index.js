import React, {useState} from "react";
import Router from 'next/router';
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


function Login(props) {
  const {LoginData, loginSuccess, loginFailed, login} = props

  const [user, setUser] = useState(undefined)
  const [pass, setPass] = useState(undefined)
  const [validation, setValidation] = useState({user: true, pass: true})

  console.log('LoginStatus', LoginData)
  const onChangeUser = (event) => {
    const value = event.target.value
    setUser(value)
  }
  const onChangePass = (event) => {
    const value = event.target.value
    setPass(value)
  }
  const onClickRegister = () => {
    Router.push('/signup/register')
  }
  const onClickLogin = () => {
    if (user && isValidEmail(user) && pass && isValidPassword(pass)) {
      login(user, pass)
      //call login
    }
    setValidation({user: isValidEmail(user), pass: isValidPassword(pass)})

  }

  return <div className={styles.container}>
    <h1>ورود به حساب کاربری</h1>
    <div className={styles.success} hidden={!loginSuccess}>
      <span>ورود با موفقیت انجام شد</span>
    </div>
    <div className={styles.error} hidden={!loginFailed}>
      <span>خطا در ورود</span>
    </div>
    <div>
      <input type={'text'} value={user} onChange={onChangeUser} placeholder={'ایمیل'}/>
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
}

const mapStateToProps = (state) => {
  console.log(state)
  return Object.assign({},

    {
      loginSuccess: isLoginSuccess(state),
      loginSailed: isLoginFailed(state),
      LoginData: selectLogin(state),
    }
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);