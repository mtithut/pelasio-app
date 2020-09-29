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

} from "../../redux/auth/reducer";
import {bindActionCreators} from "redux";
import {login, register, resetRegister} from "../../redux/auth/actions";
import Api from '../../api'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import CustomHead from "../../components/head";
import {getErrorMessage} from "../../components/utility/respMessageHandler";
import MessageHandler from "../../components/messageHandler";
import Routes from '../../components/routes'

const DisplayingErrorMessagesSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  firstname: Yup.string()
    .required('Required'),
  lastname: Yup.string()
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(6, 'The password must be at least 6 characters.')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .min(6, 'The password must be at least 6 characters.')
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function Register(props) {
  const {registerData, registerFailed, registerSuccess, register, login, resetRegister, countries} = props
  const {data} = countries
  const router = useRouter()
  const [countryList, setCountries] = useState(undefined)
  const [userPass, setUserPass] = useState({user: undefined, pass: undefined})

  useEffect(() => {
    if (registerFailed)
      resetRegister()
  }, [])

  useEffect(() => {
    if (registerSuccess && userPass.user && userPass.pass) {
      login(userPass.user, userPass.pass)
      router.push(Routes.home)
    }
  }, [registerSuccess])

  useEffect(() => {
    if (Array.isArray(data) && data.length)
      setCountries(data)
  }, [data])

  const onClickRegister = (values) => {
    register && register(values.firstname, values.lastname, values.email, values.country, values.password, values.passwordConfirmation)
    setUserPass({user: values.email, pass: values.password})

  }
  const redirectLogin = () => {
    router.push(Routes.signup)
  }

  const getMessageResult = () => {
    if (registerSuccess)
      return (registerData.data && registerData.data.message) || 'ورود با موفقیت انجام شد'
    if (registerFailed)
      return registerData && getErrorMessage(registerData.errors)
  }

  return <>
    <CustomHead/>
    <div className={styles.container}>
      <h1>حساب کاربری خود را ایجاد کنید</h1>
      <MessageHandler isError={registerFailed}
                      isSuccess={registerSuccess}
                      message={getMessageResult()}/>
      {/*<div className={styles.success} hidden={!registerSuccess}>*/}
      {/*  <span>{(registerData.data && registerData.data.message) || 'ثبت اطلاعات با موفقیت انجام شد'}</span>*/}
      {/*</div>*/}
      {/*<div className={styles.error} hidden={!registerFailed}>*/}
      {/*  {*/}
      {/*    getErrorMessage(registerData.errors)*/}
      {/*  }*/}
      {/*</div>*/}
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          country: (data && Array.isArray(data) && data.length) ? data[0].country_id : '',
          email: '',
          password: '',
          passwordConfirmation: ''
        }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            setSubmitting(false);
            onClickRegister(values)
          }, 400);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="text" name="firstname" placeholder={'نام'}/>
              <ErrorMessage name="firstname" component="div" className={styles.error}/>
            </div>
            <div>
              <Field type="text" name="lastname" placeholder={'نام خانوادگی'}/>
              <ErrorMessage name="lastname" component="div" className={styles.error}/>
            </div>
            <div>
              <Field as="select" name="country" placeholder={'کشور'}>
                {
                  countryList && countryList.map(country => <option key={`cty ${country.country_id}`}
                                                                    value={country.country_id}>{country.name}</option>)
                }
              </Field>
              <ErrorMessage name="country" component="div" className={styles.error}/>
            </div>
            <div>
              <Field type="email" name="email" placeholder={'ایمیل'}/>
              <ErrorMessage name="email" component="div" className={styles.error}/>
            </div>
            <div>
              <Field type="password" name="password" placeholder={'رمز عبور'}/>
              <ErrorMessage name="password" component="div" className={styles.error}/>
            </div>

            <div>
              <Field type="password" name="passwordConfirmation" placeholder={'تکرار رمز عبور'}/>
              <ErrorMessage name="passwordConfirmation" component="div" className={styles.error}/>
            </div>

            <div>
              <button type={'submit'} disabled={isSubmitting}>ثبت نام</button>
              <button type={'button'} onClick={redirectLogin}>ورود</button>
            </div>


          </Form>
        )
        }
      </Formik>
    </div>
  </>
}

export async function getStaticProps() {
  let countries = await Api.getCountries()
  return {
    props: {
      countries,
    },
  }
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
  login,
  resetRegister
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
