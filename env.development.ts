/**
 * development environment variables
 *
 * The variables exported from this file are injected in the app at build time
 * when the OS environment variable DIET_SAVER_ENVIRONMENT is set to "development".
 * It's also the default set of variables that get injected when the OS
 * environment variable DIET_SAVER_ENVIRONMENT is not set.
 */

const os = require("os");
const _ = require("lodash");

const networkInterfaceList = os.networkInterfaces();
const address = _.flatten(Object.values(networkInterfaceList)).find(
  (networkInterface) => {
    return networkInterface.internal === false;
  }
).address;

const API_BASE = `http://${address}:8080/`;
const API_URL = `${API_BASE}directus`;

module.exports = {
  API_BASE,
  API_URL,
  LOGIN_SCREEN_INITIAL_EMAIL: "hrastnikmateo+x@gmail.com",
  LOGIN_SCREEN_INITIAL_PASSWORD: "test1234",
};
