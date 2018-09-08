/* global process */

/**
 * Axios helper functions
 */
import axios from 'axios';

const IS_DEV = process.env.NODE_ENV === 'development';
const PROD_PATH = 'https://api.cobyo.me';
const DEV_PATH = 'http://localhost:3001';

/**
 * Get URL based on environment
 *
 * @param {string} path
 *
 * @returns {string}
 */
function getUrl(path) {
  return `${IS_DEV ? DEV_PATH : PROD_PATH}${path}`;
}

/**
 * REST post
 *
 * @param {string} path
 * @param {object} data
 *
 * @returns {AxiosPromise<any>}
 */
export function post(path, data = {}) {
  return axios.post(getUrl(path), data);
}

/**
 * REST put
 *
 * @param {string} path
 * @param {object} data
 *
 * @returns {AxiosPromise<any>}
 */
export function put(path, data = {}) {
  return axios.put(getUrl(path), data);
}

/**
 * Rest get
 *
 * @param {string} path
 *
 * @returns {AxiosPromise<any>}
 */
export function get(path) {
  return axios.get(getUrl(path));
}
