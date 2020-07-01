import React from "react";
import {Switch, Route} from "react-router-dom";
import Loadable from 'react-loadable'
import HeaderNavLayout from "layout/header-nav-layout";
// import SiderNavLayout from "layout/sider-nav-layout";
import UserLayout from "layout/user-layout";
import AccountLayout from "layout/account-layout";
import UserLogin from "pages/user/login";
import UserRegister from "pages/user/register";
import {Exception403, Exception404, Exception500} from "components/exception";
//首页
const Partial = Loadable({
    loader: () => import("pages/partial"),
    loading(){
        // return <div>加载中</div>
        return <div/>
    }
});
//首页
const Goods = Loadable({
    loader: () => import("pages/goods"),
    loading(){
        // return <div>加载中</div>
        return <div/>
    }
});
//账户资料
const AccountInfo = Loadable({
    loader: () => import("pages/account/info"),
    loading(){
        // return <div>加载中</div>
        return <div/>
    }
});
//发票信息
const AccountInvoice = Loadable({
    loader: () => import("pages/account/invoice"),
    loading(){
        // return <div>加载中</div>
        return <div/>
    }
});
//收货地址
const AccountShippingAddress = Loadable({
    loader: () => import("pages/account/shipping-address"),
    loading(){
        // return <div>加载中</div>
        return <div/>
    }
});

// const authorities = ["admin"];
const Icon = (name) => {
    return <i className={`iconfont ${name} mr4`}/>;
};
const Routes = () => (
    <Switch>
        <Route path="/user" component={UserLayout}>
            <Route path="/user" redirect="/user/login" exact={true}/>
            <Route path="/user/login" component={UserLogin}/>
            <Route path="/user/register" component={UserRegister}/>
        </Route>
        <Route path="/403" component={Exception403}/>
        <Route path="/404" component={Exception404}/>
        <Route path="/500" component={Exception500}/>
        {/*<Route path="/" component={HeaderNavLayout} authority={authorities}>*/}
        <Route path="/" component={HeaderNavLayout}>
            {/*<Route path="/position" redirect="/position/:type" exact={true}/>*/}
            {/*<Route*/}
            {/*path="/manage"*/}
            {/*authority={authorities}*/}
            {/*icon="setting"*/}
            {/*name="系统管理"*/}
            {/*>*/}
            <Route path="/" redirect="/partial" exact={true}/>
            <Route path="/home" type="a" icon={Icon('icon-notebook')} name="首页" component={Partial}/>
            <Route path="/shopping" type="a" icon={Icon('icon-notebook')} name="现货商城" component={Partial}/>
            <Route path="/sever" type="a" icon={Icon('icon-notebook')} name="合作与服务" component={Partial}/>
            <Route path="/info" type="a" icon={Icon('icon-notebook')} name="行业信息" component={Partial}/>
            <Route path="/partial" type="a" icon={Icon('icon-notebook')} name="发布采购需求" component={Partial}/>
            <Route path="/goods/:id" type="a" component={Goods}/>
            <Route path='/account' component={AccountLayout}>
                <Route path="/account" redirect="/account/info" exact={true}/>
                <Route path="/account/info" component={AccountInfo}/>
                <Route path="/account/invoice" component={AccountInvoice}/>
                <Route path="/account/shipping-address" component={AccountShippingAddress}/>
            </Route>
            {/*<Route path="/manage/theme" component={() => <div>主题设置，conunselor角色可以访问</div>}*/}
            {/*// authority={["conunselor"]} name="主题设置"*/}
            {/*/>*/}
            {/*</Route>*/}
            {/*<Route path="/cc" authority={authorities} icon="user" name="客户管理">*/}
            {/*<Route path="/cc" redirect="/manage/personal" exact={true} />*/}
            {/*<Route*/}
            {/*path="/cc/personal"*/}
            {/*component={() => <p>个人信息页，admin角色可以访问</p>}*/}
            {/*name="客户信息"*/}
            {/*/>*/}
            {/*<Route*/}
            {/*path="/cc/theme"*/}
            {/*component={() => <div>主题设置，conunselor角色可以访问</div>}*/}
            {/*authority={["conunselor"]}*/}
            {/*name="客户设置"*/}
            {/*/>*/}
            {/*</Route>*/}
            <Route component={Exception404}/>
        </Route>
    </Switch>
);

export default Routes;
