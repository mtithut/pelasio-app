export const setUser = (user) => (localStorage.setItem('user', user))
export const getUser = () => (localStorage.getItem('user'))
export const removeUser = () => (localStorage.removeItem('user'))

export const setCategoryList = (Categories) => (localStorage.setItem('Categories', Categories))
export const getCategoryList = () => (localStorage.getItem('Categories'))
export const removeCategoryList = () => (localStorage.removeItem('Categories'))

export const setTokenAccess = (token) => (localStorage.setItem('tokenAccess', token))
export const getTokenAccess = () => (localStorage.getItem('tokenAccess'))
export const removeAccess = () => (localStorage.removeItem('tokenAccess'))

export const setCartId = (cartId) => (localStorage.setItem('cartId', cartId))
export const getCartId = () => (localStorage.getItem('cartId'))
export const removeCartId = () => (localStorage.removeItem('cartId'))

export const setExpiresTime = (expiresTime) => (localStorage.setItem('expiresTime', expiresTime))
export const getExpiresTime = () => (parseInt(localStorage.getItem('expiresTime')))
export const removeExpiresTime = () => (localStorage.removeItem('expiresTime'))

export const setTokenDurationTime = (duration) => (localStorage.setItem('durationTime', duration))
export const getTokenDurationTime = () => (parseInt(localStorage.getItem('durationTime')))
export const removeTokenDurationTime = () => (localStorage.removeItem('durationTime'))

export const clearUserInfo = () => (localStorage.clear())