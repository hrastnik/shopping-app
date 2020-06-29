/**
 * This module contains the dynamic config file for Expo. The exported function
 * takes the static config from app.json, can modify it and return the final
 * configuration.
 * We use the `extra` field to inject the environment variables.
 * The environment is detected by reading the DIET_SAVER_ENVIRONMENT OS
 * environment variable
 *
 * More info on the `extra` field
 *   https://docs.expo.io/guides/environment-variables/#using-app-manifest-extra
 */

const development = require("./env.development");
const staging = require("./env.staging");
const production = require("./env.production");

const getEnvironment = (environmentName: string) => {
  if (environmentName === undefined) {
    console.log("No environment specified. Falling back to `development`.");
    return development;
  }

  const environments = {
    development,
    staging,
    production,
  };
  const environment = environments[environmentName];

  if (environment === undefined) {
    console.log(
      `Undefined environment \`${environmentName}\`. Falling back to \`development\``
    );
    return development;
  }

  console.log(`Using environment ${environmentName}.`);

  return environment;
};

export default ({ config }) => {
  const environment = getEnvironment(process.env.DIET_SAVER_ENVIRONMENT);

  return { ...config, extra: { ...config.extra, environment } };
};
