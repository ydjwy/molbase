import React, {Component} from "react";
import {Card, Row, Col, Typography, Divider} from "antd";
import  style from './index.scss'
const {Meta} = Card;
const {Paragraph} = Typography;
// data: {
//     title: '市场资讯',,
//     name: '市讯',,
//     summary : 'summary',
//     url : 'url',
//     price : 'price',
//     unit : 'unit'
// }
export default class SLSPCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // const {data: {title, list}} = this.props;
        const {
            data,
            title = 'title',
            summary = 'summary',
            url = 'url',
            price = 'price',
            unit = 'unit',
            name='name'
        } = this.props;
        return (
            <div className={style.slsp_card_wrapper}>
                <Card bordered={false} size="small" title={data[title]} extra={<a href="#">更多></a>}>
                    <small><Paragraph ellipsis>{data[summary]}</Paragraph></small>
                    <Row type="flex" align="bottom">
                        <Col span={12}>
                            <div className="fs12 mt20">
                                <Paragraph ellipsis>{data[name]}</Paragraph>
                            </div>
                            <p className="mt30 mb0">￥{data[price]}{data[unit]}</p>
                            <p className="mt5 mb0">在线支付</p>
                        </Col>
                        <Col span={12}>
                            <img width="100%" height="84"
                                 src={data[url]}
                                 alt=""/>
                        </Col>
                    </Row>
                    {/*<Divider/>*/}
                    {/*<Row gutter={10}>*/}
                    {/*{ list.map((item, index) => {*/}
                    {/*return ( <Col span={12} key={index}>*/}
                    {/*<Card bordered={false} cover={<img alt="example" height="80" src={item.url}/>}>*/}
                    {/*<Meta*/}
                    {/*title={<Paragraph ellipsis>{item.title} </Paragraph>}*/}
                    {/*description={<Paragraph ellipsis>{item.text} </Paragraph>}/>*/}
                    {/*</Card>*/}
                    {/*</Col>)*/}
                    {/*})}*/}
                    {/*</Row>*/}
                </Card>
            </div>
        )
    }
}
