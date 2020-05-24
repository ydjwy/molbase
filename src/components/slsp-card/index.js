import React, {Component} from "react";
import {Card, Row, Col, Typography, Divider} from "antd";
import  style from './index.scss'
const {Meta} = Card;
const {Paragraph} = Typography;
// data: {
//     title: '市场资讯',
//         list: [
//         { id:1, title: '药品稳定性结果',text:'在线支付', url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'},
//         { id:2, title: '药品稳定性结果', text:'在线支付', url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
//     ]
// }
export default class SLSPCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data: {title, list}} = this.props;
        return (
            <div className={style.slsp_card_wrapper}>
                <Card bordered={false} size="small" title={title} extra={<a href="#">更多></a>}>
                    <small>一站式满足实验室需求</small>
                    <Row type="flex" align="bottom">
                        <Col span={12}>
                            <div className="fs12 mt20">
                                <Paragraph ellipsis>单道可调移液器单道可调移液器gfd</Paragraph>
                            </div>
                            <p className="mt30 mb0">￥257.00起</p>
                            <p className="mt5 mb0">在线支付</p>
                        </Col>
                        <Col span={12}>
                            <img width="100%" height="84"
                                 src="http://pimg.molbase.net/upload/supplyshow/6b/9e/6b9ef3203993dac25c5faa0812c7992320180510101945.jpg"
                                 alt=""/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row gutter={10}>
                        { list.map((item, index) => {
                            return ( <Col span={12} key={index}>
                                <Card bordered={false} cover={<img alt="example" height="80" src={item.url}/>}>
                                    <Meta
                                        title={<Paragraph ellipsis>{item.title} </Paragraph>}
                                        description={<Paragraph ellipsis>{item.text} </Paragraph>}/>
                                </Card>
                            </Col>)
                        })}
                    </Row>
                </Card>
            </div>
        )
    }
}
