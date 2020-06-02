import React, {Component} from "react";
import {Card, Divider, List, Typography, Row, Col, Carousel} from "antd";
import ViewTitle from '../../../components/view-title'
import TJQYCard from '../../../components/tjqy-card'
import PPGCard from '../../../components/ppg-card'
import {getShopBrandsData, getShopEnterprises} from '../../../services/api1'
import  style from './index.scss'


export default class TradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                title: '交易大厅',
                url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
            },
            tradingData: [],
            brandData: []
        };
    }

    componentDidMount() {
        const brandsCondition = {
            page: 0,
            size: 16
        };
        const enterprisesCondition = {
            page: 0,
            size: 16
        };
        getShopBrandsData(brandsCondition).then(res => {
            if (res.content && res.content.length > 0) {
                let result = [];
                for (let i = 0; i < res.content.length; i += 8) {
                    result.push(res.content.slice(i, i + 8));
                }
                this.setState({brandData: result || []})
            }
        });
        getShopEnterprises(enterprisesCondition).then(res => {
            console.log('resddfg', res)
            if (res.data.content && res.data.content.length > 0) {
                let result = [];
                for (let i = 0; i < res.data.content.length; i += 8) {
                    result.push(res.data.content.slice(i, i + 8));
                }
                this.setState({tradingData: result || []})
            }
        });
    }

    render() {
        const {viewTitle, tradingData, brandData} = this.state;
        const tradingKeys = {
            companyName: 'companyName',
            desc: 'companyDetailed',
            imgurl: 'companyUrl'
        };
        const brandKeys = {
            title: 'companyName',
            imgUrl: 'companyUrl',
        };
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
                                                    <TJQYCard data={cItem} {...tradingKeys}/>
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
                                                    <PPGCard data={cItem} {...brandKeys}/>
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
