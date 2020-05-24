/**
 * Created by common on 2017/8/10.
 */
import moment from "moment";

/**
 * 解析url参数
 * @param {String} str url
 * @returns {Array} 参数列表
 */
function parseQueryString(str) {
    var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
    var result = {};
    var match;
    var key;
    var value;
    while ((match = reg.exec(str))) {
        key = match[2];
        value = match[3] || "";
        result[key] = decodeURIComponent(value);
    }
    return result;
}

/**
 * 参数对象转url参数
 * @param param
 * @param key
 * @param encode
 * @returns {string}
 */
function urlEncode(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        let formBody = [];
        for (let property in param) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(param[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        paramStr = formBody.join("&");
    }
    return paramStr;
}

// 给url增加时间戳
function timestamp(url) {
    const getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp
    } else {
        url = url + "?timestamp=" + getTimestamp
    }
    return url;
}

/**
 * 取任意级别city选项
 * @param {String} childFieldName 城市子数组字段名
 */
function getSomeCitys(childFieldName) {
    /**
     * @param {Array} cityOptions 城市选项
     * @param {Number} limit 取到第几层
     * @param {Number} deep 当前层数
     */
    return function getSomeCitysInner(cityOptions, limit, deep = 0) {
        cityOptions = cityOptions || [];
        deep++;
        const converted = cityOptions.map(item => {
            const res = {};
            for (const key of Object.keys(item)) {
                if (key !== childFieldName) {
                    res[key] = item[key];
                }
            }
            if (deep < limit) {
                res[childFieldName] = getSomeCitysInner(
                    item[childFieldName],
                    limit,
                    deep
                );
            }
            return res;
        });
        return converted;
    };
}

/**
 * 扁平化层级选项
 * @param {Array} data 多层数据
 * @param {String} childFieldName 子数组字段名
 */
function flatHierarchyOptions(data, childFieldName) {
    const flatedData = [];

    function hierarchy(data) {
        data = data || [];
        for (const item of data) {
            flatedData.push(item);
            const childItems = item[childFieldName];
            if (childItems) {
                delete item[childFieldName];
                hierarchy(childItems);
            }
        }
    }

    data = JSON.parse(JSON.stringify(data));
    hierarchy(data, childFieldName);
    return flatedData;
}

//显示页面标题
function showPageTitle(pathname) {
    let obj = {
        workbench: '工作台',
        customer: '客户',
        customerDetail: '客户详情',
        position: '职位',
        candidate: '候选人',
        candidateDetail: '候选人详情',
        positionDetail: '职位详情',
        reports: '报表',
        finance: '财务',
        operation: '运营中心',
        user: '登录',
        instructions: '帮助中心'
    };
    let key = pathname && pathname.split('/')[1];
    if (!!obj[key]) {
        document.title = obj[key];
    }
}

//验证日期
function validatorDate(rule, value, callback, setFieldsValue, key) {
    if (!!value) {
        const reg1 = /^\d+$/;//判断是否是纯数字（整数）;
        const reg2 = /^(19|20)\d{2}$/;//年份正则
        const reg3 = /^(19|20)\d{2}-((0?[1-9])|(1[0-2]{0,1}))$/;//年月正则
        const reg4 = /^(19|20)\d{2}-((0?[1-9])|([1-9])|(1[0-2]))-((0?[1-9])|([1-9])|([1-2][0-9])|30|31)$/;//年月日
        let val = '';
        let status = true;

        function formatDate(date) {
            if (reg2.test(date)) {
                setFieldsValue({[key]: `${date}-01-01`});
                callback();
            } else if (reg3.test(date)) {
                setFieldsValue({[key]: `${date}-01`});
                callback();
            } else if (reg4.test(date)) {
                let arr = date.split('-');
                let IYear = arr[0];
                let IMonth = arr[1];
                let IDate = arr[2];
                if (/^((0?[469])|11)$/.test(IMonth) && IDate === '31') {
                    callback('格式错误，天数错误');
                } else if (parseInt(IMonth, 10) === 2) {
                    if ((IYear % 4 === 0 && IYear % 100 !== 0) || (IYear % 400 === 0)) {
                        if (IDate <= '29') {
                            setFieldsValue({[key]: date});
                            callback();
                        } else {
                            callback('格式错误，天数错误');
                        }
                    } else if (parseInt(IDate, 10) > 28) {
                        callback('格式错误，天数错误');
                    } else {
                        setFieldsValue({[key]: date});
                        callback();
                    }
                } else {
                    setFieldsValue({[key]: date});
                    callback();
                }
            } else {
                callback('正确格式为:YYYY-MM-DD');
            }
        }

        if (reg1.test(value)) {
            let len = value.length;
            if (status) {
                switch (len) {
                    case 4:
                        val = value;
                        break;
                    case 6:
                        val = `${value.substring(0, 4)}-${value.substring(4, 6)}`;
                        break;
                    case 8:
                        val = `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
                        break;
                    default:
                        status = false;
                        break;
                }
                formatDate(val);
            } else {
                callback('格式错误，正确为YYYY-MM-DD');
            }
        } else {
            let valueArr = value.match(/\d+/g);
            if (!!valueArr) {
                formatDate(valueArr.join('-'));
            } else {
                callback('格式错误，正确为YYYY-MM-DD');
            }
        }
    } else {
        if (rule.required) {
            callback('不能为空');
        } else {
            callback();
        }
    }
}


//显示，金额格式化，三位加逗号
function moneyFormat(money) {
    let type = typeof money;
    if (type === 'number' && !isNaN(money)) {
        return money.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else if (type === 'string') {
        let n = parseFloat(money.replace(/,/g, '')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return n === 'NaN' ? null : n;
    } else {
        return null;
    }
}
//输入框金额格式化，三位加逗号
function validatorMoney(rule, value, callback, setFieldsValue, key, min) {
    const minNum = min || 0;
    if (typeof (value) === 'number' || (typeof (value) === 'string' && !!value)) {
        let n = parseFloat(value.toString().replace(/,/g, '')).toFixed(2);
        if (n !== 'NaN' && !!n) {
            const reg1 = /^(?:[1-9]\d{0,9}|0)(?:\.\d{0,2})?$/;
            if (reg1.test(n)) {
                if (n >= minNum) {
                    setFieldsValue({[key]: n.replace(/\B(?=(\d{3})+(?!\d))/g, ',')});
                    callback();
                } else {
                    callback(`请输入大于 ${minNum} 的数`);
                }
            } else {
                callback('最多保留两位小数，整数部分不超过10位数');
            }
        } else {
            callback('不能为空');
            setFieldsValue({[key]: ''})
        }
    } else {
        if (rule.required) {
            callback('不能为空');
        } else {
            callback();
        }
    }
}

//获取浏览器信息
function getExplorerInfo() {
    let explorer = window.navigator.userAgent.toLowerCase();
    if (explorer.indexOf('msie') >= 0) {//ie
        let ver = explorer.match(/msie ([\d.]+)/)[1];
        return {type: 'IE', version: ver};
    } else if (explorer.indexOf('firefox') >= 0) {//firefox
        let ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return {type: 'Firefox', version: ver};
    } else if (explorer.indexOf('chrome') >= 0) {//Chrome
        let ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return {type: 'Chrome', version: ver};
    } else if (explorer.indexOf('opera') >= 0) {//Opera
        let ver = explorer.match(/opera.([\d.]+)/)[1];
        return {type: 'Opera', version: ver};
    } else if (explorer.indexOf('safari') >= 0) {//Safari
        let ver = explorer.match(/version\/([\d.]+)/)[1];
        return {type: 'Safari', version: ver};
    } else {
        return {type: '未知', version: explorer};
    }
}

//获取两个日期中间所有的月份
function getMonthBetween(start, end) {
    if (end === '至今' || end === 'Present') {
        end = moment(new Date()).format('YYYY-MM-DD');
    }
    if (start && end && start !== '至今' && start !== 'Present' && start !== '' && end !== '') {
        start = moment(start).format('YYYY-MM-DD');
        end = moment(end).format('YYYY-MM-DD');
        let result = '';
        let min = ((new Date(start)).getFullYear()) * 12 + (new Date(start)).getMonth() + 1;
        let max = ((new Date(end)).getFullYear()) * 12 + (new Date(end)).getMonth() + 1;
        if (min < max) {
            let betweenMonth = max - min;
            if (betweenMonth < 12) {
                result = `${parseInt(betweenMonth % 12, 10)}个月`;
            } else {
                result = parseInt(betweenMonth % 12, 10) > 0 ? `${parseInt(betweenMonth / 12, 10)}年${parseInt(betweenMonth % 12, 10)}个月` : `${parseInt(betweenMonth / 12, 10)}年`;
            }
        }
        return result;
    } else {
        return '';
    }
};

export {
    getSomeCitys,
    flatHierarchyOptions,
    parseQueryString,
    urlEncode,
    timestamp,
    showPageTitle,
    validatorDate,
    moneyFormat,
    validatorMoney,
    getMonthBetween,
    getExplorerInfo
};
