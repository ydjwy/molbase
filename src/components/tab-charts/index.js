import React, {Component} from "react";
import {Tabs} from 'antd';
import  style from './index.scss'
const {TabPane} = Tabs;
// data: {
//     list: [
//         {name: '涂料及原料', type: '1', text: ''},
//         {name: '醇类', type: '2', text: ''},
//         {name: '合纤原料', type: '3', text: ''},
//         {name: '无机化工', type: '4', text: ''},
//         {name: '增塑剂', type: '5', text: ''},
//         {name: '其他有机', type: '6', text: ''}
//     ]
// }
export default class TabCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {data: {list}} = this.props;
    return (
      <div className={style.tab_charts_wrapper}>
        <Tabs tabBarExtraContent={<a href="#">更多></a>}>
          {list.map(item => <TabPane tab={item.name} key={item.type}>{item.name}</TabPane>)}
        </Tabs>
      </div>
    )
  }
}
