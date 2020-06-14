import React, {Component} from "react";
import {Card, List, Typography, Row, Col, Button, Tabs} from "antd";
import  style from './index.scss'
const {Paragraph} = Typography;
const {TabPane} = Tabs;

// data: {
//     imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//         buyerService: [//买家服务
//         {id: 1, name: '发布需求'},
//         {id: 2, name: '化工产品'},
//         {id: 3, name: '现货商城'},
//         {id: 4, name: '市场行情'},
//         {id: 5, name: '大综百科'},
//         {id: 6, name: '买家手册'},
//     ],
//         sellerService: [//卖家服务
//         {id: 1, name: '免费旺铺'},
//         {id: 2, name: '在线交易'},
//         {id: 3, name: 'SaaS服务'},
//         {id: 4, name: '营销推广'},
//         {id: 5, name: 'SGS认证'},
//         {id: 6, name: '供应链服务'},
//     ],
//         list: [
//         {id: 1, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
//         {id: 2, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
//     ]
// }
export default class WelcomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {data: {imgUrl, list, buyerService, sellerService}} = this.props;
        return (
            <div className={style.welcome_wrapper}>
                <Card>
                    <h3 align="center">欢迎来到大综</h3>
                    <Row gutter={20} className='mb20 mt20'>
                        <Col span={12}>
                            <Button type="primary">请登录</Button>
                        </Col>
                        <Col span={12}>
                            <Button>免费注册</Button>
                        </Col>
                    </Row>
                    <Tabs defaultActiveKey="1" size="small">
                        <TabPane tab="买家服务" key="1">
                            <Row gutter={10}>
                                {buyerService && buyerService.map(item => {
                                    return (<Col span={8} key={item.id} className='mb10'><Button className='fs12'>{item.name}</Button></Col>)
                                })}
                            </Row>
                        </TabPane>
                        <TabPane tab="卖家服务" key="2">
                            <Row gutter={10}>
                                {sellerService && sellerService.map(item => {
                                    return (<Col span={8} key={item.id} className='mb10'><Button className='fs12'>{item.name}</Button></Col>)
                                })}
                            </Row>
                        </TabPane>
                    </Tabs>
                    <img width="100%" height="76" className='mt10 mb10' src={imgUrl} alt=""/>
                    <List
                        size="small"
                        dataSource={list}
                        renderItem={item => <List.Item><Paragraph ellipsis>{item.title}</Paragraph></List.Item>}
                    />
                </Card>
            </div>
        )
    }
}
