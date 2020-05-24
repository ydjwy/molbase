import React, {Component} from "react";
import {Card, Row, Col} from "antd";
import  style from './index.scss'

// data: {
//     title: '百度增值服务',
//         list: [
//         {name: '市场分析', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
//         {name: '数据接口', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
//         {name: '定制合成', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
//         {name: '注册', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'}
//     ]
// }
export default class BDZZCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {data: {title, list}} = this.props;
    return (
      <div className={style.zzs_wrapper}>
        <Card bordered={false} size="small" title={title} extra={<a href="#">更多></a>}>
          <Row gutter={10}>
            {list.map((item, index) => (
              <Col key={index} span={12} className={index < 2 ? '' : 'mt10'}><img src={item.url} width='100%' alt=""/></Col>))}
          </Row>
        </Card>
      </div>
    )
  }
}
