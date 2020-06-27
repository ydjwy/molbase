import React, {PureComponent} from "react";
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import userModel from "../../../store/reducers/user";
import {getMenuMatches, urlToList} from "../../utils";
const {SubMenu} = Menu;


// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === "string" && icon.indexOf("http") === 0) {
    return <img src={icon} alt="icon" className="icon"/>;
  }
  if (typeof icon === "string") {
    return <Icon type={icon}/>;
  }
  return icon;
};
@connect(({user}) => ({...user}), {...userModel.actions})
export default class BaseMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
  }

  flatMenuKeys = this.getFlatMenuKeys(this.props.menuData);

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const {
      location: {pathname}
    } = this.props;
    return urlToList(pathname).map(itemPath =>
      getMenuMatches(this.flatMenuKeys, itemPath).pop()
    );
  };

  hasAuthority = (userAuth, authoritys) => {
    // Retirement authority, return target;
    if (!authoritys || !userAuth) {
      return true;
    }
    // 数组处理
    if (Array.isArray(authoritys)) {
      if (authoritys.indexOf(userAuth) >= 0) {
        return true;
      }
      return false;
    }

    // string 处理
    if (typeof authoritys === "string") {
      if (authoritys === userAuth) {
        return true;
      }
      return false;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item, parent);
        return ItemDom;
        // return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    const {userAuth} = this.props;
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child.name) &&
      this.hasAuthority(userAuth, item.authority)
    ) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
              item.name
            )
          }
          key={item.path}>
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return this.hasAuthority(userAuth, item.authority) ? (
      <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    ) : null;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const name = item.name;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const {target} = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const {location} = this.props;
    let showDom;
    if (item.type === 'a') {
      const currentRoute = window.location && window.location.hash && window.location.hash.split('/')[1];
      showDom = <a
        disabled={currentRoute === item.auth}
        href={`${window.location.origin}/#${itemPath}`}
        target="_blank">
        {icon}
        <span>{name}</span>
      </a>
    } else {
      showDom = <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
      >
        {icon}
        <span>{name}</span>
      </Link>
    }
    return showDom;
  };

  // permission to check
  //   checkPermissionItem = (authority, ItemDom) => {
  //     const { Authorized } = this.props;
  //     if (Authorized && Authorized.check) {
  //       const { check } = Authorized;
  //       return check(authority, ItemDom);
  //     }
  //     return ItemDom;
  //   };

  conversionPath = path => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };

  render() {
    const {
      openKeys,
      onOpenChange,
      menuData,
      theme,
      collapsed,
      className,
      mode
    } = this.props;
    let menuListData = [];
    const {roleObj} = this.state;
    menuData.forEach(item => {
      if (item.auth) {
        if (!!roleObj[item.auth]) {
          menuListData.push(item)
        }
      } else {
        menuListData.push(item)
      }
    });
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys) {
      props = collapsed ? {} : {openKeys};
    }
    return (
      <Menu
        key="Menu"
        className={className}
        theme={theme}
        mode={mode}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        {...props}>
        {this.getNavMenuItems(menuListData)}
      </Menu>
    );
  }
}
