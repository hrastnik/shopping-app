/**
 * This module reads and re-exports the environment variables injected
 * through `app.config.ts`.
 * For more information
 */

import Constants from "expo-constants";
import * as yup from "yup";

const validationSchema = yup.object({
  API_BASE: yup.string().required(),
  API_URL: yup.string().required(),
  LOGIN_SCREEN_INITIAL_EMAIL: yup.string().required(),
  LOGIN_SCREEN_INITIAL_PASSWORD: yup.string().required(),
});

export type Environment = yup.InferType<typeof validationSchema>;
export const environment = Constants.manifest.extra.environment as Environment;

try {
  validationSchema.validateSync(environment);
} catch (error) {
  console.log("Invalid environment variables.", environment);
  throw error;
}
