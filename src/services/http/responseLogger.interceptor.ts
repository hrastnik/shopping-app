export function responseLogger(response) {
  const lines = [];
  const { url, method, params = {} } = response.config;
  const queryParams =
    (Object.keys(params).length ? "?" : "") +
    Object.entries(params)
      .map(([key, value]) => (value === undefined ? "" : key + "=" + value))
      .join("&");
  lines.push(
    `${method.toUpperCase()} ${url.replace(response.config.baseURL, "") +
      queryParams} | RESPONSE`
  );

  const maxLines = 320;
  const maxLineLenght = 180;
  const { data } = response;
  if (data) {
    const dataString = JSON.stringify({ data }, null, 2)
      .split("\n")
      .slice(0, maxLines)
      .map(line =>
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
    .map(l => "< " + l);
  pretty.push("");

  console.groupCollapsed(
    `< ${method.toUpperCase()} ${url.replace(response.config.baseURL, "") +
      queryParams} | RESPONSE`
  );
  console.log(pretty.join("\n"));
  console.groupEnd();

  return response;
}
