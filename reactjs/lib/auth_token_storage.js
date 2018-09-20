
const storage = window ? window.localStorage : {};

export function storeToken(token) {
  storage.setItem('token', token);
  return token;
}

export function getToken() {
  return storage['token'];
}

export function isTokenSet() {
  const token = getToken();
  return (typeof (token) !== 'undefined' && token !== null);
}

export function removeToken() {
  storage.removeItem('token', { path: '/' });
}

export function getTokenFromRequest(req) {
  let token = null;
  if (req !== null) {
    // TODO: here should take the auth from the http header
    // const rawCookie = cookie.parse(req.headers.cookie);
    // token = rawCookie.token;
  } else {
    token = getToken();
  }
  return token;
}
