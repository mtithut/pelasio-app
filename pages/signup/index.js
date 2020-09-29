import React, {useEffect, useState} from "react";
import Router, {useRouter} from 'next/router';
import styles from '../../styles/Home.module.css'
import {connect} from "react-redux";
import {isValidEmail, isValidPassword} from "../../components/utility/validation";
import {bindActionCreators} from "redux";
import {login, cleanLoginState} from "../../redux/auth/actions";
import {
  isLoginFailed,
  isLoginSuccess,
  selectLogin,
} from "../../redux/auth/reducer";
import Head from "next/head";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import CustomHead from "../../components/head";
import {getErrorMessage} from "../../components/utility/respMessageHandler";
import MessageHandler from "../../components/messageHandler";


const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

function Login(props) {
  const {LoginData, loginSuccess, loginFailed, login, cleanLoginState} = props
  console.log('status', LoginData)
  const router = useRouter()

  useEffect(() => {
    if (loginFailed) cleanLoginState()
    else if (loginSuccess) router.push('/')
  }, [])

  useEffect(() => {
    if (loginSuccess) {
      router.back()
    }
  }, [loginSuccess])

  const onClickRegister = () => {
    router.push('/signup/register')
  }
  const onClickLogin = (values) => {
    if (values.email && values.password) {
      login(values.email, values.password)
    }

  }
  const getMessageResult = () => {
    if (loginSuccess)
      return (LoginData.data && LoginData.data.message) || 'ورود با موفقیت انجام شد'
    if (loginFailed)
      return LoginData && getErrorMessage(LoginData.errors)
  }

  return <>
    <CustomHead/>
    <div className={styles.container}>
      <h1>ورود به حساب کاربری</h1>
      <MessageHandler isError={loginFailed}
                      isSuccess={loginSuccess}
                      message={getMessageResult()}/>
      {/*<div className={styles.success} hidden={!loginSuccess}>*/}
      {/*  <span>{(LoginData.data && LoginData.data.message) || 'ورود با موفقیت انجام شد'}</span>*/}
      {/*</div>*/}
      {/*<div className={styles.error} hidden={!loginFailed}>*/}
      {/*  <span>{LoginData && getErrorMessage(LoginData.errors)}</span>*/}
      {/*</div>*/}
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            setSubmitting(false);
            onClickLogin(values)
          }, 400);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder={'نام کاربری'}/>
              <ErrorMessage name="email" component="div" className={styles.error}/>
            </div>
            <div>
              <Field type="password" name="password" placeholder={'رمزعبور'}/>
              <ErrorMessage name="password" component="div" className={styles.error}/>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                ورود
              </button>
              <button type={'button'} onClick={onClickRegister}>ثبت نام</button>
            </div>
          </Form>
        )}
      </Formik>
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
  login, cleanLoginState,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);