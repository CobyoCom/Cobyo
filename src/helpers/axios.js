/**
 * Axios helper functions
 */
import axios from 'axios';

/**
 * REST post
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {AxiosPromise<any>}
 */
export function post(url, data = {}) {
  // If PROD, use prod url.
  return axios.post(url, data);
}

/**
 * REST put
 *
 * @param {string} url
 * @param {object} data
 *
 * @returns {AxiosPromise<any>}
 */
export function put(url, data = {}) {
  return axios.put(url, data);
}

/**
 * Rest get
 *
 * @param {string} url
 *
 * @returns {AxiosPromise<any>}
 */
export function get(url) {
  return axios.get(url);
}