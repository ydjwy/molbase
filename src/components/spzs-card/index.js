import React, {Component} from "react";
import {Card, Icon, Avatar, Typography,Tabs ,Row,Col} from "antd";
import style from './index.scss'
const { TabPane } = Tabs;

export default class SPZSCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
    companyName: '郑州派尼化学试剂厂',
        logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        address: '中国 河南 郑州',
        abstract: '中原地区化学试剂批发生产厂家',
        product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
        isShowProduct: true,
                imgUrl:'http://qawyn04ic.bkt.clouddn.com/10727.jpg'
}
        };
    }

    componentDidMount() {
    }


    render() {
        const {data: {companyName, address, abstract, product, logo, isShowProduct,imgUrl}} = this.state;
        return (
            <div className={style.spzs_card_wrapper}>
                <Card cover={<img src={imgUrl} />} bordered={false}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="1"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="2"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="3"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="4"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="5"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="6"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="7"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="8"/>
                        <TabPane tab={<img width="30" height="30" src={imgUrl}/>} key="9"/>
                    </Tabs>
                    <Row gutter={10}>
                        <Col span={18}>货号：1232432654765869</Col>
                        <Col span={6} align="right">收藏</Col>
                    </Row>
                    <p>送摩贝积分 3 </p>
                </Card>
            </div>
        );
    }
}

