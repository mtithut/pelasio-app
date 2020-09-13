import React, {useState} from "react";
import Router from 'next/router';
import styles from '../../styles/Home.module.css'
import {connect} from "react-redux";
import {
  isValidEmail,
  isValidFamily,
  isValidName,
  isValidPassword,
  isValidPasswordRep
} from "../../components/utility/validation";


function Register(props) {
  const {register} = props
  const [name, setName] = useState(undefined)
  const [family, setFamily] = useState(undefined)
  const [country, setCountry] = useState(1)
  const [email, setEmail] = useState(undefined)
  const [pass, setPass] = useState(undefined)
  const [passRep, setPassRep] = useState(undefined)
  const [validation, setValidation] = useState({name: true, family: true, email: true, pass: true, passRep: true})


  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeFamily = (event) => {
    setFamily(event.target.value)
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
    if (isValidName(name) && isValidFamily(family) && isValidEmail(email) && country && isValidPassword(pass) && isValidPasswordRep(pass, passRep)) {
      // call register
    }
    setValidation({
      name: isValidName(name),
      family: isValidFamily(family),
      email: isValidFamily(email),
      pass: isValidPassword(pass),
      passRep: isValidPasswordRep(pass, passRep)
    })
  }
  const onClickGoLogin = () => {
    Router.push('/signup')
  }


  return <div className={styles.container}>
    <h1>حساب کاربری خود را ایجاد کنید</h1>
    <div>
      <input type={'text'} value={name} onChange={onChangeName} placeholder={'نام'}/>
    </div>
    <div className={styles.error} hidden={validation.name}>
      <span>نام را وارد کنید</span>
    </div>
    <div>
      <input type={'text'} value={family} onChange={onChangeFamily} placeholder={'نام خانواگی'}/>

    </div>
    <div className={styles.error} hidden={validation.family}>
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

const mapStateToProps = state => ({});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Register);