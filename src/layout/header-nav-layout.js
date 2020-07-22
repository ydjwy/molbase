import React, {PureComponent} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Layout, Menu, Dropdown, Icon, message} from "antd";
import Authorized from "utils/authorized";
import BaseMenu from "components/header/menu/base-menu";
import HeaderMenu from "components/header/header-menu";
import HeaderCart from "components/header/header-cart";
import Content from "./content";
import layoutWrapper from "./layout-wrapper";
import style from "./header-nav-layout.scss";
import userModel from "../store/reducers/user";
import {showPageTitle} from '../utils/util'
import {logout} from '../services/api2'
const {Header: AntHeader} = Layout;
@connect(({user}) => ({...user}), {...userModel.actions})
export default layoutWrapper()(
    class HeaderNavLayout extends PureComponent {
        render() {
            const {
                className,
                children,
                location,
                route,
                menuData
            } = this.props;
            return (
                <Authorized
                    authority={route.authority}
                    noMatch={<Redirect to="/user/login"/>}>
                    <Layout className={`${style['header-nav-layout']} ${className || ""}`}>
                        <Layout style={{minHeight: "100vh"}}>
                            <Header menuData={menuData} {...this.props} showPageTitle={showPageTitle}/>
                            <Content
                                route={route}
                                location={location}
                                className={style["header-nav-layout-content"]}>
                                {children}
                            </Content>
                            {/*<p className={style.copyright} align="center">Copyright © 2015 Career International Consulting</p>*/}
                        </Layout>
                    </Layout>
                </Authorized>
            );
        }
    }
);

class Header extends PureComponent {
    componentDidMount() {
        this.props.showPageTitle(this.props.history.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.showPageTitle(nextProps.history.location.pathname);
    }

    render() {
        const {menuData, roles} = this.props;
        const moreList = (<Menu>
            <Menu.Item>
                <Link to='/account/info'>账户管理</Link>
            </Menu.Item>
        </Menu>);
        const candidateDetHead = this.props.history.location.pathname && this.props.history.location.pathname.split('/')[1];
        return (
            <AntHeader style={{padding: 0}}>
                <div style={{borderBottom: '1px solid #eee'}}>
                    <div id="header">
                        <BaseMenu
                            menuData={menuData}
                            roles={roles}
                            location={this.props.location}
                            history={this.props.history}
                            mode="horizontal"
                        />
                        <Dropdown overlay={moreList} className="ml10">
              <span className="header_more">
                <i className={`iconfont icon-gengduo mr4`}/>更多 <Icon type="down"/>
              </span>
                        </Dropdown>
                        <CustomHeader {...this.props}/>
                    </div>
                </div>
                <div id="header_menu" style={{paddingLeft: 'calc(100vw - 100%)'}}
                     className={candidateDetHead === 'candidateDetail' ? 'candidateDetailHead' : ''}>
                    <HeaderMenu menuData={menuData} location={this.props.location} history={this.props.history}/>
                </div>
            </AntHeader>
        );
    }
}

class CustomHeader extends PureComponent {
    onHandle = (data) => {
        if (data.key === '0') {
            logout().then(res => {
                    if (res.status === 200) {
                        message.success(res.msg);
                        this.props.history.replace('/user/login');
                    }

                }
            )
        }
    };

    render() {
        const menu = (
            <Menu onClick={this.onHandle}>
                <Menu.Item key="0">退出登录</Menu.Item>
            </Menu>
        );
        return (
            <React.Fragment>
                <div className="right">
                    <HeaderCart/>
                    <Dropdown className="ml20" overlay={menu}><span style={{color: '#fff'}}>我的辽西大宗</span></Dropdown>
                </div>
            </React.Fragment>
        );
    }
}
