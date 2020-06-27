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
  }

  //组件更新
  componentWillReceiveProps(nextProps) {
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