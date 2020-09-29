import {getExpiresTime, getTokenDurationTime, getUser} from "../localStorage";

export const isValidFirstname = value => {
  return value && value.length
}
export const isValidLastname = value => {
  return value && value.length
}
export const isValidPassword = (value) => {
  return value && value.length
}
export const isValidPasswordRep = (pass, passRep) => {
  return passRep && passRep.length && pass === passRep
}

const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const isValidEmail = (value) => {
  return emailRegx.test(value)
}

export const isExpireToken = () => {
  const dateSec = parseInt((new Date()).getTime() / 1000)
  console.log(dateSec, getExpiresTime())
  return (getExpiresTime() <= dateSec)
}

export const doRefreshToken = () => {
  const dateSec = (new Date()).getTime() / 1000
  return getExpiresTime() && (dateSec < getExpiresTime() && dateSec > (getExpiresTime() - (getTokenDurationTime() / 2))) //token valid for 1/2 duration
}