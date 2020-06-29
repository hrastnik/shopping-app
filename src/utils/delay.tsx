const delay = (delayMs) =>
  new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });

export { delay };
