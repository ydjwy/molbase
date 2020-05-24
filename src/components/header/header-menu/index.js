/**
 * Created by CI11840 on 2019/6/3.
 */
import React, {Component} from "react";
import {Menu} from "antd";
import {connect} from "react-redux";
import globalModel from "../../../store/reducers/global";
// import style from './index.scss'
// import {selectType} from '../../utils/util';
@connect(({global}) => ({...global}), {...globalModel.actions})
export default class HeaderNavBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: '',//当前所在的模块
      roleObj: {},//权限对象列表
    };
  }

  //装载完成
  componentDidMount() {
    const {location: {pathname}} = this.props;
    let currentUser = localStorage.getItem('currentUser');
    if (!!currentUser) {
      let userInfo = currentUser && JSON.parse(currentUser);
      let roleObj = {};
      let resources = [];
      if (!!userInfo.roleType && userInfo.roleType === 'superadmin') {
        if (userInfo.bindAccount) {
          resources = JSON.parse(userInfo.bindAccount.role).perm.resources || [];
        } else {
          // window.location.href = '/#/user/login';
        }
      } else if (!!userInfo.roleType && JSON.parse(userInfo.role).perm) {
        resources = JSON.parse(userInfo.role).perm.resources || [];
      }

      resources.forEach(item => {
        roleObj[item.code] = item.resources;
      });
      //候选人报告模板隐藏或者财务角色只展示公司信息配置
      if (!!roleObj.operation) {
        const roleType = userInfo.roleType;
        const bindRoleType = userInfo.bindAccount && userInfo.bindAccount.roleType;
        if ((roleType === 'superadmin' && bindRoleType === 'finance') || roleType === 'finance') {
          roleObj.operation = roleObj.operation.filter(item => item.code === 'op-4');
        } else {
          roleObj.operation = roleObj.operation.filter(item => item.code !== 'op-2');
        }
      }
      //KA管理隐藏
      if (!!roleObj.customer) {
        roleObj.customer = roleObj.customer.filter(item => item.code !== 'cu-3');
      }
      let currentMenu = [];
      let newSelectedTabKey = '';
      if (pathname === '/') {
        currentMenu = ['', 'position'];
        newSelectedTabKey = ((roleObj[currentMenu[1]] && roleObj[currentMenu[1]][0] && roleObj[currentMenu[1]][0].code) || '');
      } else {
        currentMenu = pathname && pathname.split('/');
        if (!!roleObj[currentMenu[1]]) {
          let tabKey = '';
          roleObj[currentMenu[1]].forEach(item => {
            if (item.code === currentMenu[2]) {
              tabKey = currentMenu[2];
            }
          });
          newSelectedTabKey = tabKey || ((roleObj[currentMenu[1]][0] && roleObj[currentMenu[1]][0].code) || '');
        }
      }
      this.setState({currentMenu: currentMenu[1], roleObj});
    }
  }

  //组件更新
  componentWillReceiveProps(nextProps) {
    const pathname = nextProps.location.pathname;
    const {roleObj} = this.state;
    let selectedTabKey = '';
    if (pathname !== this.props.location.pathname && JSON.stringify(roleObj) !== '{}') {
      let currentMenu = pathname && pathname.split('/');
      if (currentMenu[1]) {
        !!roleObj[currentMenu[1]] && roleObj[currentMenu[1]].forEach(item => {
          if (item.code === currentMenu[2]) {
            selectedTabKey = currentMenu[2];
          }
        });
        selectedTabKey = selectedTabKey ? selectedTabKey : ((roleObj[currentMenu[1]] && roleObj[currentMenu[1]][0] && roleObj[currentMenu[1]][0].code) || '');
        this.setState({currentMenu: currentMenu[1]});
      }
    }
  }

  //切换菜单
  onMenuClick = (menu) => {
    const {onChangeSelectedTabKey, selectedTabKey, selectedTabKeyStatus} = this.props;
    onChangeSelectedTabKey({...menu, status: !selectedTabKeyStatus});
    if (selectedTabKey !== menu.key) {
      this.props.history.push(menu.key);
    }
  };

  render() {
    const {selectedTabKey} = this.props;
    const {roleObj, currentMenu} = this.state;
    const menuList = roleObj[currentMenu] && roleObj[currentMenu].map(item => {
        return (<Menu.Item key={item.code}>{item.name}</Menu.Item>)
      });
    return (
      <div>
        {menuList && menuList.length > 0 && (
        <Menu onClick={this.onMenuClick} selectedKeys={[selectedTabKey]} mode="horizontal">
          {menuList}
        </Menu>)}
      </div>
    );
  }
}