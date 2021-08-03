export const getCookie = (cname) => {
  if (typeof window === "undefined") {
    return null;
  }
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie
    .split(";")
    .map((c) => c.trimLeft())
    .filter((c) => c.indexOf(name) === 0);
  return ca.length === 1 ? ca[0].substring(name.length, ca[0].length) : null;
};

export const setCookie = (cname, cvalue, expiration = 0) => {
  if (typeof window === "undefined") {
    return null;
  }
  const d = new Date();
  d.setTime(d.getTime() + expiration * 1000 * 60 * 60); // hours
  const time = expiration ? d.toUTCString() : 0;
  document.cookie = `${cname}=${cvalue};expires=${time};path=/`;
};
