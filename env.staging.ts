/**
 * staging environment variables
 *
 * The variables exported from this file are injected in the app at build time
 * when the OS environment variable DIET_SAVER_ENVIRONMENT is set to "staging"
 */

module.exports = {
  API_URL: "http://192.168.1.104:4000/graphql",
};
