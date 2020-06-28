export const USER_STORE_KEY = 'currentUser';
export const USER_STATUS_NO_LOGIN = 5112;
export const API_STATUS_KEY = 'code';
export const API_UPLOAD = 'http://123.56.104.75:8000/api/upload';
const currentUser = localStorage.getItem('currentUser');
export const USER_TOKEN = (currentUser && JSON.parse(currentUser).token) || '';

