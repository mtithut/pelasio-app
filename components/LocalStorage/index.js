export const setUser = (user) => (localStorage.setItem('user', user))
export const getUser = () => (localStorage.getItem('user'))
export const removeUser = () => (localStorage.removeItem('user'))

export const setTokenAccess = (token) => (localStorage.setItem('tokenAccess', token))
export const getTokenAccess = () => (localStorage.getItem('tokenAccess'))
export const removeAccess = () => (localStorage.removeItem('tokenAccess'))

export const setCartId = (cartId) => (localStorage.setItem('cartId', cartId))
export const getCartId = () => (localStorage.getItem('cartId'))
export const removeCartId = () => (localStorage.removeItem('cartId'))
export const clearUserInfo = () => (localStorage.clear('cartId'))