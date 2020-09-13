import React, {useState} from "react";
import Router from 'next/router';
import styles from '../../styles/Home.module.css'
import {connect} from "react-redux";
import {isValidEmail, isValidPassword} from "../../components/utility/validation";


function Login(props) {
    const {login} = props
    const [user, setUser] = useState(undefined)
    const [pass, setPass] = useState(undefined)
    const [validation, setValidation] = useState({user: true, pass: true})
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
            //call login

        }
        setValidation({user: isValidEmail(user), pass: isValidPassword(pass)})

    }
    return <div className={styles.container}>
        <h1>ورود به حساب کاربری</h1>
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

const mapStateToProps = state => ({});


const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Login);