export const preprocess = (data, propName, processFn) => {
  if (data == null || typeof data !== "object") return data;

  const nested = data[propName];

  if (Array.isArray(nested)) {
    processFn(nested);
    data[propName] = nested.map(e => (typeof e === "object" ? e.id : e));
  } else if (typeof nested === "object") {
    processFn(nested);
    data[propName] = nested.id;
  }
};
