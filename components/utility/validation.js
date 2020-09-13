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