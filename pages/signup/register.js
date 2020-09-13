import React, {useState} from "react";
import Router from 'next/router';
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
import {bindActionCreators} from "redux";
import {register} from "../../redux/signup/actions";


function Register(props) {
  const {registerData, registerFailed, registerSuccess, register} = props
  const [firstname, setFirstname] = useState(undefined)
  const [lastname, setLastname] = useState(undefined)
  const [country, setCountry] = useState(1)
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
    Router.push('/signup')
  }


  return <div className={styles.container}>
    <h1>حساب کاربری خود را ایجاد کنید</h1>
    <div className={styles.success} hidden={!registerSuccess}>
      <span>ثبت اطلاعات با موفقیت انجام شد</span>
    </div>
    <div className={styles.error} hidden={!registerFailed}>
      <span>خطا در ورود</span>
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
        <option value={1}> ایران</option>
        <option value={2}>عراق</option>
        <option value={2}>افغانستان</option>
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
}

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