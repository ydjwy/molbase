import React, {PureComponent} from "react";
// import {Link,Redirect} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
// import {Layout, Menu, Icon, Dropdown, Avatar,Badge} from "antd";
import {Layout, Popconfirm, Menu, Dropdown, Icon } from "antd";
import Authorized from "utils/authorized";
import BaseMenu from "components/header/menu/base-menu";
import HeaderMenu from "components/header/header-menu";
import Content from "./content";
import layoutWrapper from "./layout-wrapper";
import style from "./header-nav-layout.scss";
import userModel from "../store/reducers/user";
import {showPageTitle} from '../utils/util'
const {Header: AntHeader} = Layout;
// const Logo = () => {
//   return <img className={`${style.header_logo} mr10` } src={require('../assets/imgs/logo_1.png')} alt=""/>;
// };
@connect(({user}) => ({...user}), {...userModel.actions})
export default layoutWrapper()(
  class HeaderNavLayout extends PureComponent {
    render() {
      const {
        className,
        children,
        location,
        route,
        menuData,
        userInfo
      } = this.props;
      return (
        <Authorized
          authority={route.authority}
          noMatch={<Redirect to="/user/login"/>}
        >
          <Layout className={`${style['header-nav-layout']} ${className || ""}`}>
            <Layout
              style={{
                minHeight: "100vh"
              }}
              // className="layout-content"
            >
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
        <a target="_blank" rel="noopener noreferrer"
           href="http://erp.careerintlinc.com/SitePages/Recruitment/Myposition.aspx?selectpanel=p1&selectitem=10">
          <span>旧版职位</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://track.careerintlinc.com:1238/">
          <span>旧版候选人</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer"
           href="http://erp.careerintlinc.com/_layouts/15/Career.Workflow2013/Report.aspx?module=My%20Report%20Center">
          <span>旧版报表</span>
        </a>
      </Menu.Item>
    </Menu>);
    const candidateDetHead = this.props.history.location.pathname && this.props.history.location.pathname.split('/')[1];
    return (
      <AntHeader style={{padding: 0}}>
        <div style={{borderBottom: !(candidateDetHead === 'customerDetail' || candidateDetHead === 'candidateDetail') ? '1px solid #eee':0}}>
          <div id="header">
            {/*<Logo/>*/}
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
        <div id="header_menu" style={{paddingLeft:'calc(100vw - 100%)'}} className={candidateDetHead === 'candidateDetail' ? 'candidateDetailHead':''}>
          <HeaderMenu menuData={menuData} location={this.props.location} history={this.props.history}/>
        </div>
      </AntHeader>
    );
  }
}

class CustomHeader extends PureComponent {
  render() {
    const {userInfo, logout} = this.props;
    // console.log('userInfo', userInfo)
    // const {name, avatar, logout} = this.props;
    // const menu = (
    //   <Menu selectedKeys={[]}>
    //     <Menu.Item key="userCenter">
    //       <Link to="/center">
    //         <Icon type="user" className="mr5"/>
    //         个人中心
    //       </Link>
    //     </Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item key="logout">
    //       <span onClick={logout}>
    //         <Icon type="logout" className="mr5"/>
    //         退出登录
    //       </span>
    //     </Menu.Item>
    //   </Menu>
    // );
    // window.location.href = '/#/user/login';
    let showName;
    if (userInfo.roleType === 'superadmin') {
      if (userInfo.bindAccount) {
        showName = `${userInfo.englishName} (${userInfo.name}) （${userInfo.bindAccount.englishName} (${userInfo.bindAccount.name})）`;
      } else {
        // window.location.href = '/#/user/login';
      }
    } else {
      showName = `${userInfo.englishName} (${userInfo.name})`;
    }
    return (
      <React.Fragment>
        <div className="right">
          <span className="name vam mr10 show_name">{showName}</span>
          <Popconfirm placement="bottomRight" title="确定退出登录?" onConfirm={logout} okText="确定" cancelText="取消">
            <span className={`cp color_text vam ${style.logout_icon}`} title="退出登录">
            <i className="iconfont icon-poweroff fs18 vam"/>
          </span>
          </Popconfirm>

          {/*<Badge count={11} overflowCount={9}>*/}
          {/*<i className="iconfont icon-bell vam fs20"/>*/}
          {/*</Badge>*/}
          {/*<Dropdown overlay={menu}>*/}
          {/*<span className="ml20">*/}
          {/*<Avatar*/}
          {/*size="small"*/}
          {/*className="mr10"*/}
          {/*src={avatar}*/}
          {/*alt="avatar"*/}
          {/*/>*/}
          {/*<span className="name">{name}</span>*/}
          {/*</span>*/}
          {/*</Dropdown>*/}
        </div>
      </React.Fragment>
    );
  }
}
