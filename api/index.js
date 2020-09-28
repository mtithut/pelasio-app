import axios from 'axios'
import {getTokenAccess} from "../components/localStorage";

export const baseUrl = 'http://api.pelazio.test';
// export const baseUrl = 'http://192.168.101.88';

export const urls = {
  login: '/v1/customers/users/auth/login',
  register: '/v1/customers/users/auth/register',
  userShow: '/v1/customers/profile',
  refreshToken: '/v1/customers/users/refresh',
  countries: '/v1/baseinfo/countries',
  provinces: '/v1/baseinfo/provinces',
  categories: '/v1/baseinfo/categories',
  categoriesTree: '/v1/baseinfo/categories/tree',
  banks: '/v1/baseinfo/banks',
  addresses: '/v1/customers/addresses',
  productSearch: '/v1/customers/products/search',
  productFilter: '/v1/customers/products/filter/',
  catalogs: '/v1/customers/catalogs/',
  carts: '/v1/customers/carts',
  gustToken: '/v1/customers/guest/token',
  nationalCode: '/v1/customers/profile/national-code',
  verificationCode: '/v1/customers/phone/verification/send',
  verify: '/v1/customers/phone/verification/verify',
  orders: '/v1/customers/orders'//?country=ir

}

const post = function (url, body = '', headers = {}) {
  return axios.post(baseUrl + url, body, {headers: headers})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const put = function (url, body = {}, headers = {}) {
  return axios.put(baseUrl + url, body, {headers: headers, /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};
const patch = function (url, body = '', headers = {}) {
  return axios.patch(baseUrl + url, body, {headers: headers, /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const get = function (url, params = {}, headers = {}) {
  headers = Object.assign(headers, {'accept-language': 'fa'})
  return axios.get(baseUrl + url, {params: params, headers: headers /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const deleteCall = function (url, data = {}, headers = {}) {
  return axios.delete(baseUrl + url, {data: data, headers: headers,/* withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};


export default {
  get: get,
  post: post,
  put: put,
  delete: deleteCall,
  getGustToken: () => get(urls.gustToken),
  getCountries: () => get(urls.countries),
  getProvinces: (countryId) => get(`${urls.countries}/${countryId}/provinces`),
  getCities: (provinceId) => get(`${urls.provinces}/${provinceId}/cities`),
  getBanks: () => get(urls.banks),
  login: function (user, pass) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    let data = {username: user, password: pass}
    return post(urls.login, data, headers)
  },
  register: function (firstname, lastname, email, country, password, passwordRep) {
    let data = {
      country_id: country, firstname: firstname, lastname: lastname,
      email: email, password: password, password_confirmation: passwordRep
    }

    return post(urls.register, data)
  },
  refreshProfile: function (params) {

  },
  refreshToken: () => {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return post(urls.refreshToken, {}, headers)
  },

  getCategory: (lang = 'fa') => get(urls.categories, {lang: lang}),
  getCategoryTree: (lang = 'fa') => get(urls.categoriesTree, {lang: lang}),
  getProductSearch: (filters = {}) => get(urls.productSearch, filters),
  getProductFilter: function (category, limit, sort, inStock, lang) {
    const params = {category: category, limit: limit, sort: sort, 'in-stock': inStock, lang: lang}
    return get(urls.productFilter, params)
  },
  getCatalogs: function (id, country, lang) {
    let params = {country: country, lang: lang}
    return get(urls.catalogs + id, params)
  },
  getCart: function (cartId) {
    const token = getTokenAccess()
    const headers = {Authorization: `Bearer ${token}`}
    return get(`${urls.carts}/${cartId}/refresh`, undefined, headers)
  },
  addToCart: function (id, quantity) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    let data = {
      quantity: quantity,
      unique_id: id
    }
    return post(urls.carts, data, headers)
  },
  cartIncreaseItem: function (cartId, itemId) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return patch(`${urls.carts}/${cartId}/items/${itemId}/increase`, undefined, headers)
  },
  cartDecreaseItem: function (cartId, itemId) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return patch(`${urls.carts}/${cartId}/items/${itemId}/decrease`, undefined, headers)
  },
  cartsDeleteItem: function (cartId, itemId) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return deleteCall(`${urls.carts}/${cartId}/items/${itemId}`, {}, headers)
  },
  cartsRefresh: function (cartId, country, lang) {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return get(`${urls.carts}/${cartId}/refresh?country=${country}&lang=${lang}`, undefined, headers)
  },
  getAddresses: () => {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return get(urls.addresses, undefined, headers)
  },
  addAddress: (title, country, province, city_id, address_line_one, postal_code, latitude,
               longitude, phone, prefix, receiver,) => {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    let data = {
      address_line_one: address_line_one,
      city_id: city_id,
      country: country,
      latitude: latitude,
      longitude: longitude,
      phone: phone,
      postal_code: postal_code,
      province: province,
      receiver: receiver,
      title: title
    }
    return post(urls.addresses, data, headers)
  },
  updateAddress: () => {
  },
  deleteAddress: (addressId) => {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return deleteCall(`${urls.addresses}/${addressId}`, {}, headers)
  },
  selectAddressCart: (cartId, addressId, country) => {
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    const data = {address_id: addressId}
    return put(`${urls.carts}/${cartId}?country=${country}`, data, headers)

  },
  sendNationalCode: (nationalCode) => {
    const data = {
      national_code: nationalCode
    }
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return post(urls.nationalCode, data, headers)
  },
  phoneVerification: (nationalCode, phone, prefix) => {
    const data = {
      national_code: nationalCode,
      phone: phone,
      prefix: prefix
    }
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return post(urls.verificationCode, data, headers)
  },
  phoneVerify: (token) => {
    const data = {
      token: token
    }
    const authToken = getTokenAccess()
    const headers = authToken ? {Authorization: `Bearer ${authToken}`} : {}
    return post(urls.verify, data, headers)
  },
  requestOrders: (country, bankId, cartId, needInvoice, note, paymentMethodId) => {
    const data = {
      bank_id: bankId,
      cart_unique_id: cartId,
      need_invoice: needInvoice,//0
      note: note,//'adasad'
      payment_method_id: paymentMethodId
    }
    const token = getTokenAccess()
    const headers = token ? {Authorization: `Bearer ${token}`} : {}
    return post(`${urls.orders}?country=${country}`, data, headers)
  }

}
