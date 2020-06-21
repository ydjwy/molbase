import {urlEncode, timestamp} from 'utils/util';
import {/*Modal,*/ message} from 'antd';
import {getHeaders} from "../utils/headers";
// import {history} from 'root';
// import {USER_STATUS_NO_LOGIN, API_STATUS_KEY} from 'contants';

// const _ = require('underscore');
// let goLogin = false;
const xhr = ({url, body = null, method = "POST", dataType = "json"}) => {
    // function transformError(response) {
    //   let message = '系统异常，请联系管理员';
    //   if (!_.isEmpty(response.data)) {
    //     if (_.isObject(response.data)) {
    //       message = _.values(response.data)[0];
    //     } else if (_.isString(response.data)) {
    //       message = response.data;
    //     }
    //   }
    //   return message;
    // }

    function parseRequest(response) {
        // if (response.code === 0 || (response.code >= 200 && response.code < 300)) {
        //     goLogin = false;
        //     // return response;
        // } else if (response.code === 1001) {
        //     window.location.href = '/#/user/login';
        //     goLogin = true;
        //     // return false;
        // } else if (response.code === 2001) {
        //     !goLogin && Modal.warning({
        //         title: '提示',
        //         content: response.message,
        //         okText: '去登录',
        //         keyboard: false,
        //         onOk: function () {
        //             localStorage.removeItem("currentUser");
        //             window.location.href = '/#/user/login';
        //             window.location.reload(true);
        //         }
        //     });
        //     goLogin = true;
        // } else if (response.code === 3001) {
        //     window.location.href = '/#/403';
        // } else if (response.code === 4001) {
        //     if (response.result.password || response.result.userName) {
        //         let text = (response.result.password || '') + (response.result.userName || '');
        //         message.warning(text);
        //     }
        //
        // } else {
        //     goLogin = false;
        //     if (response.code === 500) {
        //         const codes = ['002', '003', '004', '007', '008', '009', '010', '011', '012', 'Claim:001', 'Claim:002'];
        //         if (!(response.result && (codes.indexOf(response.result.code) > -1))) {
        //             message.error(response.message)
        //         }
        //     } else {
        //         response.code !== 4001 && message.warning(response.message)
        //     }
        //     // return response;
        // }
        return response || {}
    }

    function checkStatus(response) {
        // console.log('checkStatus',response)
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            // let error = new Error(response.statusText);
            // error.response = response;
            // throw error;
            // window.location.href = '/#/500';
            message.warning('数据错误！');
        }
    }

    function parseJSON(response) {
        return response.json();
    }

    /**
     * handle no login case.
     * pop up login dialog when any interface return no login status
     * except url with 'state' param, it's three part login process
     * @param {*} response
     */
        // function handleNoLogin(response) {
        //   // judge app is logining status just now
        //   if (response[API_STATUS_KEY] === USER_STATUS_NO_LOGIN) {
        //     root.store.dispatch({type: 'user/setUser', payload: {}});
        //     localStorage.removeItem('user');
        //     history.replace('/user/login');
        //   }
        //   return response;
        // }

        // function log(response) {
        //   return response;
        // }

        // let param = {
        //     method: method,
        //     headers: {'Content-Type': 'application/json', Accept: '*/*'},
        //   };
    let param = {
            method: method,
            headers: getHeaders(dataType)
        };

    if (method === "post" || method === "POST") {
        switch (dataType) {
            case "form":
                body = urlEncode(body);
                break;
            case "json":
                body = JSON.stringify(body);
                break;
            default:
                body = JSON.stringify(body);
                break;

        }
    }
    if (dataType === 'download' && method === "GET") {
        window.location.href = `${url}?${urlEncode(body)}`;
        return;
    }
    if (body) {
        if (method === "get" || method === "GET") {
            url = `${url}?${urlEncode(body)}`
        } else {
            console.log('body', body)
            param.body = body
        }
    }

    // 给所有请求加时间戳
    url = timestamp(url);

    param.credentials = 'include';
    return fetch(url, param)
        .then(checkStatus)
        .then(parseJSON)
        .then(parseRequest)
        .catch(err => {
            console.log(err);
            return err
        });
    // .then(handleNoLogin)
    // .then(log)
    // .catch(response => {
    // if (response[API_STATUS_KEY] === 404) {
    //   history.push('/404');
    // } else if (response[API_STATUS_KEY] === 500) {
    //   history.push('/500');
    // }
    // throw response;
    // });
};

export default xhr;
