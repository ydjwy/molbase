/**
 * Created by CI11840 on 2019/3/25.
 */
import XHR from "services";
let prefix = '/cts/v1.0';
// let prefix = '';
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
//根据CI账号、姓名、英文名、手机号等关键字查询账号(已加网关)
export async function getAccountsBySearchKey(params) {
    return XHR({
        url: prefix + '/authcenter/account/web/getAccountsBySearchKey/' + params,
        method: 'GET'
    });
}

// 导出登录日志表格
export async function exportLoginLogMonitorReport(params) {
    return XHR({
        url: prefix + '/authcenter/monitor/web/exportLoginLogMonitorReport',
        method: 'GET',
        body: params,
        dataType: 'download'
    });
}