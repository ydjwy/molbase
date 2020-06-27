import React, {Component} from "react";
import {Card, List, Typography} from "antd";
import  style from './index.scss'

// data: {
//     title: '市场资讯',
//         list: [
//         {name: '市场分析', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
//         {name: '数据接口', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
//         {name: '定制合成', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
//         {name: '定制合成', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
//         {name: '定制合成', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
//         {name: '注册', type: '装置', title: '[PP粒]:国内PP装置检修及未来检修计划一览表（20200515）', url: ''}
//     ]
// }
export default class SCZXCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {data: {title, list}} = this.props;
    return (
      <div className={style.sczx_wrapper}>
        <Card bordered={false} size="small" title={title} extra={<a>更多></a>}>
          <List
            bordered={false}
            dataSource={list||[]}
            renderItem={item => (
              <List.Item>
                <Typography.Paragraph ellipsis>【{item.type}】{item.title}</Typography.Paragraph>
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}
