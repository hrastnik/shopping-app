export function requestLogger(config) {
  const lines = [];

  const { url, data, method, params = {} } = config;
  const queryParams =
    (Object.keys(params).length ? "?" : "") +
    Object.entries(params)
      .map(([key, value]) => (value === undefined ? "" : key + "=" + value))
      .join("&");

  lines.push(
    `${method.toUpperCase()} ${url.replace(config.baseURL, "") + queryParams}`
  );

  const token = config?.headers?.Authorization;
  const tokenShort = token ? `${token.substr(0, 40)}...` : "No JWT set";
  lines.push(`Token: ${tokenShort}`);

  const maxLines = 320;
  const maxLineLenght = 180;

  if (data) {
    const dataString = JSON.stringify({ data }, null, 2)
      .split("\n")
      .slice(0, maxLines)
      .map((line) =>
        line.length > maxLineLenght
          ? line.substr(0, maxLineLenght - 3) + "..."
          : line
      )
      .join("\n");
    lines.push(`Data: ${dataString}`);
  }

  const pretty = lines
    .join("\n")
    .split("\n")
    .map((l) => "> " + l);
  pretty.push("");

  console.groupCollapsed(
    `> ${method.toUpperCase()} ${url.replace(config.baseURL, "") + queryParams}`
  );
  console.log(pretty.join("\n"));
  console.groupEnd();

  return config;
}
