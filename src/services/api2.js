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
//退出登录
export async function logout() {
    return XHR({
        url: prefix + '/api/web/auth/logout',
        method: 'GET'
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

//收货地址 新增修改
export async function shippingAddressSaveOrUpdate(params) {
    return XHR({
        url: prefix + '/api/web/address/saveOrUpdate',
        body: params,
        method: 'POST'
    });
}

// 账号收获地址列表查询
export async function getShippingAddressList(params) {
    return XHR({
        url: prefix + '/api/web/address/getUserAddress',
        body: params,
        method: 'GET'
    });
}

// 删除账号收获地址
export async function deleteShippingAddress(params) {
    return XHR({
        url: prefix + '/api/web/address/del/' + params,
        method: 'GET'
    });
}
// 修改账号默认收获地址
export async function modifyDefaultAddress(params) {
    return XHR({
        url: prefix + '/api/web/address/default/' + params,
        method: 'GET'
    });
}

// 商品详情
export async function findGoodsDetail(params) {
    return XHR({
        url: prefix + '/api/web/product/detail/' + params,
        method: 'GET'
    });
}

// 购物车 单件商品 新增修改
export async function joinCart(params) {
    return XHR({
        url: prefix + '/api/web/cart/add',
        body: params,
        method: 'POST'
    });
}

// 导航栏我的购物车
export async function navMyCart(params) {
    return XHR({
        url: prefix + '/api/web/cart/myCart',
        method: 'GET'
    });
}

// 删除我的购物车商品
export async function delMyCartGoods(params) {
    return XHR({
        url: prefix + '/api/web/cart/del',
        body:params,
        method: 'POST'
    });
}
// 我的购物车商品
export async function myCartGoodsList(params) {
    return XHR({
        url: prefix + '/api/web/cart/list',
        method: 'GET'
    });
}

// 购物车 修改单件产品数量
export async function modifyMyCartGoodsNum(params) {
    return XHR({
        url: prefix + '/api/web/cart/num',
        body:params,
        method: 'POST'
    });
}

// 购物车 核对订单信息的商品列表
export async function confirmOrderInfo(params) {
    return XHR({
        url: prefix + '/api/web/order/confirm',
        body:params,
        method: 'POST'
    });
}

//购物车 创建订单
export async function createOrder(params) {
    return XHR({
        url: prefix + '/api/web/order/create',
        body:params,
        method: 'POST'
    });
}


