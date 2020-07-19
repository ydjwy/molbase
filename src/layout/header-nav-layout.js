import React, {PureComponent} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Layout, Popconfirm, Menu, Dropdown, Icon} from "antd";
import Authorized from "utils/authorized";
import BaseMenu from "components/header/menu/base-menu";
import HeaderMenu from "components/header/header-menu";
import HeaderCart from "components/header/header-cart";
import Content from "./content";
import layoutWrapper from "./layout-wrapper";
import style from "./header-nav-layout.scss";
import userModel from "../store/reducers/user";
import {showPageTitle} from '../utils/util'
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
    render() {
        const {/*userInfo,*/ logout} = this.props;
        return (
            <React.Fragment>
                <div className="right">
                    <span className="mr20" style={{color: "#fff"}}>我的辽西大宗</span>
                    <HeaderCart/>
                    <Popconfirm placement="bottomRight" title="确定退出登录?" onConfirm={logout} okText="确定" cancelText="取消">
                        <span className={`cp color_text  ${style.logout_icon}`} title="退出登录">
                            <i className="iconfont icon-poweroff fs18 vam"/>
                        </span>
                    </Popconfirm>
                </div>
            </React.Fragment>
        );
    }
}
