export function replaceLocationHash(hash, baseUrl = window.location) {
  let url = urlWithHash(hash, baseUrl);
  history.replaceState({}, "", url);
}

export function pushLocationHash(hash, baseUrl = window.location) {
  window.location = urlWithHash(hash, baseUrl);
}

function urlWithHash(hash, baseUrl) {
  let url = baseUrl.toString();
  let index = url.indexOf("#");
  if (index >= 0) url = url.substring(0, index);
  return url + "#" + hash;
}
