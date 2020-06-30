export function isPromise(value) {
  return Boolean(value && typeof value.then === "function");
}
