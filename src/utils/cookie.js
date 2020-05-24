/**
 * Created by CI11840 on 2019/4/10.
 */
export const setCookie = (name, value, days) => {
  let d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = name + "=" + value + "; " + expires;
};
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
};