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
import {register, resetRegister} from "../../redux/signup/actions";
import Api from '../../api'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

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
  const {registerData, registerFailed, registerSuccess, register, resetRegister, countries} = props
  const {data} = countries
  const router = useRouter()
  const [countryList, setCountries] = useState(undefined)

  useEffect(() => {
    if (registerFailed)
      resetRegister()
  }, [])

  useEffect(() => {
    if (Array.isArray(data) && data.length)
      setCountries(data)
  }, [data])

  const onClickRegister = (values) => {
    register && register(values.firstname, values.lastname, values.email, values.country, values.password, values.passwordConfirmation)

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
              <button type={'button'} onClick={onClickGoLogin}>ورود</button>
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
  resetRegister
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
