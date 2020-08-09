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
        // }
        return response || {}
    }

    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            if (response.status === 401) {
                localStorage.removeItem('currentUser');
                window.location.href = '/#/user/login';
            } else {
                message.warning('接口响应错误！');
            }
            return response;
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
};

export default xhr;
