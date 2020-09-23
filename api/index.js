import axios from 'axios'
import {getTokenAccess} from "../components/LocalStorage";

export const baseUrl = 'http://api.pelazio.test';
// export const baseUrl = 'http://192.168.101.88';

export const urls = {
  login: '/v1/customers/users/auth/login',
  register: '/v1/customers/users/auth/register',
  countries: '/v1/baseinfo/countries',
  provinces: '/v1/baseinfo/provinces',
  categories: '/v1/baseinfo/categories',
  addresses: '/v1/customers/addresses',
  productSearch: '/v1/customers/products/search/',
  productFilter: '/v1/customers/products/filter/',
  catalogs: '/v1/customers/catalogs/',
  carts: '/v1/customers/carts',
  gustToken: '/v1/customers/guest/token'
}

const post = function (url, body = '', headers = {}) {
  return axios.post(baseUrl + url, body, {headers: headers})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const put = function (url, body = '', headers = {}) {
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
  return axios.get(baseUrl + url, {params: params, headers: headers /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const deleteCall = function (url, body = '', headers = {}) {
  return axios.delete(baseUrl + url, {headers: headers,/* withCredentials: true*/})
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
  login: function (user, pass) {
    let data = {username: user, password: pass}
    return post(urls.login, data)
  },
  register: function (firstname, lastname, email, country, password, passwordRep) {
    let data = {
      country_id: country, firstname: firstname, lastname: lastname,
      email: email, password: password, password_confirmation: passwordRep
    }

    return post(urls.register, data)
  },
  getCategory: () => get(urls.categories),
  getProductSearch: function (category, limit, sort, inStock, lang) {
    let params = `?category=${category}&limit=${limit}&sort=${sort}&in-stock=${inStock}&lang=${lang}`
    return get(urls.productSearch + params)
  },
  getProductFilter: function (category, limit, sort, inStock, lang) {
    let params = `?category=${category}&limit=${limit}&sort=${sort}&in-stock=${inStock}&lang=${lang}`
    return get(urls.productFilter + params)
  },
  getCatalogs: function (id, country, lang) {
    let params = `?country=${country}&lang=${lang}`
    return get(urls.catalogs + id + params)
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
  addAddress: () => {
  },
  updateAddress: () => {
  }
}
