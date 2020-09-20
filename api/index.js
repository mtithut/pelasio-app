import axios from 'axios'

export const baseUrl = 'http://api.pelazio.test';
// export const baseUrl = 'http://192.168.101.88';

export const urls = {
  login: '/v1/customers/users/auth/login',
  register: '/v1/customers/users/auth/register',
  countries: '/v1/baseinfo/countries',
  categories: '/v1/baseinfo/categories',
  productSearch: '/v1/customers/products/search/',
  productFilter: '/v1/customers/products/filter/',
  catalogs: '/v1/customers/catalogs/',
}

const post = function (url, headers = {}, body = '') {
  return axios.post(baseUrl + url, body, {headers: headers})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const put = function (url, headers = {}, body = '') {
  return axios.put(baseUrl + url, body, {headers: headers, /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const get = function (url, params = {}) {
  return axios.get(baseUrl + url, {params: params, /*withCredentials: true*/})
    .then((response) => response.data)
    .catch((error) => {
      throw error && error.response && error.response.data;
    });
};

const deleteCall = function (url, headers = {}, body = '') {
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
  getCountries: () => get(urls.countries),
  login: function (user, pass) {
    let data = {username: user, password: pass}
    return post(urls.login, {}, data)
  },
  register: function (firstname, lastname, email, country, password, passwordRep) {
    let data = {
      country_id: country, firstname: firstname, lastname: lastname,
      email: email, password: password, password_confirmation: passwordRep
    }

    return post(urls.register, {}, data)
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
  }
}
