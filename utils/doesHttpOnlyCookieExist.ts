function doesHttpOnlyCookieExist(cookiename: string): boolean {
  var d = new Date();
  d.setTime(d.getTime() + 1000);
  var expires = "expires=" + d.toUTCString();

  document.cookie = cookiename + "=new_value;path=/;" + expires;
  if (document.cookie.indexOf(cookiename + "=") == -1) {
    return true;
  } else {
    return false;
  }
}
export default doesHttpOnlyCookieExist;
