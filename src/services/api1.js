/**
 * Created by CI11840 on 2019/3/25.
 */
import XHR from "services";
// let prefix = '/cts/v1.0';
let prefix = 'http://123.56.104.75:8000';
//登录(已加网关)
export async function loginAccount(params) {
    return XHR({
        url: prefix + '/authcenter/account/web/login',
        body: params,
        dataType: 'form',
        method: 'POST'
    });
}
//退出登录(已加网关)
export async function loginOut() {
    return XHR({
        url: prefix + '/authcenter/account/web/logout',
        method: 'POST'
    });
}
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

//菜单数据
export async function getStoreCategory(params) {
    return XHR({
        url:prefix+'/api/portal/lxdzStoreCategory',
        method: 'GET',
        body: params
    })
}
//实力商品
export async function getStoreProduct(params) {
    return XHR({
        url:prefix+'/api/portal/lxdzStoreProduct',
        method: 'GET',
        body: params
    })
}
//导航轮播图数据
export async function getSystemGroupData(params) {
    return XHR({
        url:prefix+'/api/portal/lxdzSystemGroupData',
        method: 'GET',
        body: params
    })
}

//品牌馆列表
export async function getShopBrandsData(params) {
    return XHR({
        url:prefix+'/api/portal/getLxdzShopBrands',
        method: 'GET',
        body: params
    })
}

//推荐企业列表
export async function getShopEnterprises(params) {
    return XHR({
        url:prefix+'/api/portal/getLxdzShopEnterprises',
        method: 'GET',
        body: params
    })
}
