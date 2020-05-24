let Headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Accept: "*/*",
};
export const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser"));
export const setHeaders = (params) => {
  Headers = {...Headers, ...params};
};

export const getHeaders = (dataType) => {
  let _dataType = '';
  switch (dataType) {
    case "form":
      _dataType = 'application/x-www-form-urlencoded';
      break;
    case "multipart":
      _dataType = 'multipart/form-data';
      break;
    case "json":
      _dataType = 'application/json';
      break;
    case "xml":
      _dataType = 'text/xml';
      break;
    case "text":
      _dataType = 'text/plain';
      break;
    default:
      _dataType = 'application/json';
      break;
  }
  const currentUser = getCurrentUser();
  //username中文编码
  // let obj = {username: currentUser && encodeURI(currentUser.userName), accessToken: currentUser && currentUser.accessToken};
  let obj = {username: currentUser && currentUser.userName, accessToken: currentUser && currentUser.accessToken};
  if (obj.username && obj.accessToken) {
    Headers = {...Headers, ...obj};
    //username中文编码
    // Headers.username = encodeURI(decodeURI(Headers.username));
  } else if (Headers.accessToken) {
    delete Headers.username;
    delete Headers.accessToken;
  }
  Headers["Content-Type"] = _dataType;
  return Headers;
};