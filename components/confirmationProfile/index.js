import styles from "../../styles/Home.module.css";
import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import Api from "../../api";
import {getErrorMessage} from "../utility/respMessageHandler";
import Header from "../header";
import MessageHandler from "../messageHandler";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  nationalCode: Yup.string()
    .min(10, 'The national Code must be 10 characters.')
    .max(10, 'The national Code must be 10 characters.')
    .matches(/\d{10}/, 'Is not in correct format national Code')
    .required('Required'),
  phone: Yup.string()
    .matches(/^9\d{9}$/, 'Is not in correct format phone.Without 0')
    .notRequired(),
});

const DisplayingErrorMessagesSchemaVerify = Yup.object().shape({
  token: Yup.string()
    .min(5, 'The national Code must be 5 characters.')
    .max(5, 'The national Code must be 5 characters.')
    .matches(/\d{5}/, 'Is not in correct format verify Code')
    .required('Required'),
});

export default function ConfirmationProfile({onSuccess, onCancel}) {
  const [isValidationInfoView, setIsValidationView] = useState(true)
  const [isVerifyView, setIsVerifyView] = useState(false)
  const [{isSuccess, isError, message}, setAlertMessage] = useState({isSuccess: false, isError: false, message: ''})

  const onSaveNationalCode = (values) => {
    if (values && values.nationalCode)
      Api.sendNationalCode(values.nationalCode)
        .then(resp => {
          setAlertMessage({isSuccess: true, isError: false, message: resp.message || 'با موفقیت ثبت شد'})
          onSavePhone(values)
        })
        .catch(reason => {
          setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)})
        })


  }
  const onSavePhone = (values) => {
    if (values && values.phone) {

      Api.phoneVerification(values.nationalCode, '+98' + values.phone, '+98')
        .then(resp => {
          setAlertMessage({
            isSuccess: true,
            isError: false,
            message: `${resp.message || 'با موفقیت ثبت شد'}. کد فعالسازی برای ${values.phone} ارسال شد`
          })
          setIsValidationView(false)
          setIsVerifyView(true)
        })
        .catch(reason => {
          setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)})
        })
    }
  }

  const onVerifyCode = (values) => {
    if (values && values.token)
      Api.phoneVerify(values.token)
        .then(resp => {
          onSuccess()
          setAlertMessage({isSuccess: true, isError: false, message: resp.message})
        })
        .catch(reason => {
          setAlertMessage({isSuccess: false, isError: true, message: getErrorMessage(reason)})
        })
  }
  return <>
    <h3>اعتبارسنجی اطلاعات شخصی</h3>
    <MessageHandler isError={isError} isSuccess={isSuccess} message={message}/>
    {
      isValidationInfoView &&
      <Formik
        initialValues={{nationalCode: '', phone: ''}}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            setSubmitting(false);
            onSaveNationalCode(values)
          }, 400);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="text" name="phone" placeholder={'شماره موبایل'}/>
              <ErrorMessage name="phone" component="div" className={styles.error}/>
            </div>
            <div>
              <Field type="text" name="nationalCode" placeholder={'کدملی'}/>
              <ErrorMessage name="nationalCode" component="div" className={styles.error}/>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                ثبت
              </button>
              <button type={'button'} onClick={onCancel}>انصراف</button>
            </div>
          </Form>
        )}
      </Formik>
    }

    {
      isVerifyView &&
      <Formik
        initialValues={{token: ''}}
        validationSchema={DisplayingErrorMessagesSchemaVerify}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            setSubmitting(false);
            onVerifyCode(values)
          }, 400);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="text" name="token" placeholder={'کدتایید'}/>
              <ErrorMessage name="token" component="div" className={styles.error}/>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                ثبت
              </button>
              <button type={'button'} onClick={onCancel}>انصراف</button>
            </div>
          </Form>
        )}
      </Formik>
    }
  </>
}