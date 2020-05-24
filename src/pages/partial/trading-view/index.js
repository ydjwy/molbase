import React, {Component} from "react";
import {Card, Divider, List, Typography, Row, Col, Carousel} from "antd";
import ViewTitle from '../../../components/view-title'
import TJQYCard from '../../../components/tjqy-card'
import PPGCard from '../../../components/ppg-card'
import  style from './index.scss'


export default class TradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                title: '交易大厅',
                url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
            },
            tradingData: [[
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                }
            ], [
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                },
                {
                    companyName: '公司名称',
                    desc: 'www.instagram.com',
                    imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                }
            ]],
            brandData: [
                [
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'}
                ], [
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'},
                    {title: '推广服务推广服务', imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg'}
                ]
            ]
        };
    }

    render() {
        const {viewTitle, tradingData, brandData} = this.state;
        return (
            <div className={style.trading_view_wrapper}>
                <Row gutter={20}>
                    <Col span={24}>
                        <ViewTitle data={viewTitle}/>
                    </Col>
                    <Col span={18}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">推荐企业</Divider>}
                              extra={ <a href="#">更多></a>}>
                            <Carousel autoplay={true}>
                                {tradingData && tradingData.map((rItem, rIndex) => {
                                    return ( <Row key={rIndex} gutter={20}>
                                        {rItem && rItem.map((cItem, cIndex) => {
                                            return (
                                                <Col key={cIndex} span={6}>
                                                    <TJQYCard data={cItem}/>
                                                </Col>)
                                        })}
                                    </Row>)
                                })}

                            </Carousel>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">品牌馆</Divider>}
                              extra={ <a href="#">更多></a>}>
                            <Carousel autoplay={true}>
                                {brandData && brandData.map((rItem, rIndex) => {
                                    return ( <Row key={rIndex} gutter={20}>
                                        {rItem && rItem.map((cItem, cIndex) => {
                                            return (
                                                <Col key={cIndex} span={12} className={cIndex < 6 ? 'mb20' : ''}>
                                                    <PPGCard data={cItem}/>
                                                </Col>)
                                        })}
                                    </Row>)
                                })}

                            </Carousel>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
