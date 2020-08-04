/**
 * Created by CI11840 on 2019/3/25.
 */
import XHR from "services";
const prefix = 'http://123.56.104.75:8000';

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
    console.log(params,1234)
    return XHR({
        url: prefix + '/api/web/register/verify',
        body: params,
        method: 'POST'
    });
}

//菜单数据
export async function getStoreCategory(params) {
    return XHR({
        url: prefix + '/api/portal/lxdzStoreCategory',
        method: 'GET',
        body: params
    })
}
//实力商品
export async function getStoreProduct(params) {
    return XHR({
        url: prefix + '/api/portal/lxdzStoreProduct',
        method: 'GET',
        body: params
    })
}
//导航轮播图数据
export async function getSystemGroupData(params) {
    return XHR({
        url: prefix + '/api/portal/lxdzSystemGroupData',
        method: 'GET',
        body: params
    })
}

//品牌馆列表
export async function getShopBrandsData(params) {
    return XHR({
        url: prefix + '/api/portal/getLxdzShopBrands',
        method: 'GET',
        body: params
    })
}

//推荐企业列表
export async function getShopEnterprises(params) {
    return XHR({
        url: prefix + '/api/portal/getLxdzShopEnterprises',
        method: 'GET',
        body: params
    })
}
