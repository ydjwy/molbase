import React, {Component} from "react";
import {Card, Divider, List, Typography, Row, Col, Carousel} from "antd";
import SLSPCard from '../../../components/slsp-card'
import TJQYCard from '../../../components/tjqy-card'
import PPGCard from '../../../components/ppg-card'
import  style from './index.scss'


export default class GoodsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData: [
                {
                    title: '市场资讯',
                    list: [
                        {
                            id: 1,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 2,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }
                    ]
                },{
                    title: '市场资讯',
                    list: [
                        {
                            id: 1,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 2,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }
                    ]
                },{
                    title: '市场资讯',
                    list: [
                        {
                            id: 1,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 2,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }
                    ]
                },{
                    title: '市场资讯',
                    list: [
                        {
                            id: 1,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 2,
                            title: '药品稳定性结果',
                            text: '在线支付',
                            url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }
                    ]
                }
            ]

        };
    }

    render() {
        const {goodsData} = this.state;
        return (
            <div className={style.goods_view_wrapper}>
                <Row gutter={20}>
                    <Col span={18}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">实力商品</Divider>}
                              extra={ <a href="#">更多></a>}>
                            <Row gutter={20}>
                                {goodsData && goodsData.map((rItem, rIndex) => {
                                    return (<Col key={rIndex} span={6}>
                                        <SLSPCard data={rItem}/>
                                    </Col>)
                                })}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">采购服务</Divider>}
                              extra={ <a href="#">更多></a>}>
                            <img width="100%" src="http://img.molbase.net/4e/5a/fg/10291.png" alt=""/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
