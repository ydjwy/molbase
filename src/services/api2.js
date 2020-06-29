/**
 * Created by YD on 2020/6/21.
 */
/**
 * Created by CI11840 on 2019/3/25.
 */
import XHR from "services";
// let prefix = '/cts/v1.0';
const prefix = 'http://123.56.104.75:8010';
//登录(已加网关)
// export async function loginAccount(params) {
//     return XHR({
//         url: prefix + '/authcenter/account/web/login',
//         body: params,
//         dataType: 'form',
//         method: 'POST'
//     });
// }
// //退出登录(已加网关)
// export async function loginOut() {
//     return XHR({
//         url: prefix + '/authcenter/account/web/logout',
//         method: 'POST'
//     });
// }
// //根据CI账号、姓名、英文名、手机号等关键字查询账号(已加网关)
// export async function getAccountsBySearchKey(params) {
//     return XHR({
//         url: prefix + '/authcenter/account/web/getAccountsBySearchKey/' + params,
//         method: 'GET'
//     });
// }

// // 导出登录日志表格
// export async function exportLoginLogMonitorReport(params) {
//     return XHR({
//         url: prefix + '/authcenter/monitor/web/exportLoginLogMonitorReport',
//         method: 'GET',
//         body: params,
//         dataType: 'download'
//     });
// }


//登录
export async function login(params) {
    return XHR({
        url: prefix + '/api/web/login',
        body: params,
        method: 'POST'
    });
}
//注册
export async function register(params) {
    return XHR({
        url: prefix + '/api/web/register',
        body: params,
        method: 'POST'
    });
}
//获取注册验证码
export async function getRegisterVerify(params) {
    return XHR({
        url: prefix + '/api/web/register/verify',
        body: params,
        method: 'POST'
    });
}
//获取城市信息
export async function getCitys(params) {
    return XHR({
        url: prefix + '/api/web/portal/city/getCitys',
        method: 'GET'
    });
}

//获取账号信息
export async function getUserData(params) {
    return XHR({
        url: prefix + '/api/web/user/getUserData',
        body: params,
        method: 'GET'
    });
}

//保存账号信息
export async function saveUserData(params) {
    return XHR({
        url: prefix + '/api/web/user/save',
        body: params,
        method: 'POST'
    });
}

//更新账号信息
export async function updateUserData(params) {
    return XHR({
        url: prefix + '/api/web/user/update',
        body: params,
        method: 'POST'
    });
}
//获取公司信息
export async function getUserApplicant(params) {
    return XHR({
        url: prefix + '/api/web/applicant/getUserApplicant',
        body: params,
        method: 'GET'
    });
}

//保存公司信息
export async function saveUserApplicantData(params) {
    return XHR({
        url: prefix + '/api/web/applicant/save',
        body: params,
        method: 'POST'
    });
}

//更新公司信息
export async function updateUserApplicantData(params) {
    return XHR({
        url: prefix + '/api/web/applicant/update',
        body: params,
        method: 'POST'
    });
}

//获取增值税普通发票信息
export async function getOrdinvoice(params) {
    return XHR({
        url: prefix + '/api/web/ordinvoice/getInvoice',
        body: params,
        method: 'GET'
    });
}

//保存增值税普通发票信息
export async function saveOrdinvoice(params) {
    return XHR({
        url: prefix + '/api/web/ordinvoice/save',
        body: params,
        method: 'POST'
    });
}

//更新增值税普通发票信息
export async function updateOrdinvoice(params) {
    return XHR({
        url: prefix + '/api/web/ordinvoice/update',
        body: params,
        method: 'POST'
    });
}

//获取增值税专项发票信息
export async function getVatinvoice(params) {
    return XHR({
        url: prefix + '/api/web/vatinvoice/getVatinvoice',
        body: params,
        method: 'GET'
    });
}

//保存增值税专项发票信息
export async function saveVatinvoice(params) {
    return XHR({
        url: prefix + '/api/web/vatinvoice/save',
        body: params,
        method: 'POST'
    });
}

//更新增值税专项发票信息
export async function updateVatinvoice(params) {
    return XHR({
        url: prefix + '/api/web/vatinvoice/update',
        body: params,
        method: 'POST'
    });
}

//获取发票接收方式信息
export async function getReceiveAddress(params) {
    return XHR({
        url: prefix + '/api/web/receiveAddress/getAddress',
        body: params,
        method: 'GET'
    });
}

//保存发票接收方式信息
export async function saveReceiveAddress(params) {
    return XHR({
        url: prefix + '/api/web/receiveAddress/save',
        body: params,
        method: 'POST'
    });
}

//更新发票接收方式信息
export async function updateReceiveAddress(params) {
    return XHR({
        url: prefix + '/api/web/receiveAddress/update',
        body: params,
        method: 'POST'
    });
}