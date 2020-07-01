import React, {Component} from "react";
import {Card, Divider, Row, Col, Carousel} from "antd";
import ViewTitle from '../../../components/partial/view-title'
import TJQYCard from '../../../components/partial/tjqy-card'
// import PPGCard from '../../../components/partial/ppg-card'
import {/*getShopBrandsData,*/ getShopEnterprises} from '../../../services/api1'
import  style from './index.scss'


export default class TradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                // title: '合作企业',
                url: require('../../../assets/imgs/合作企业.png')
            },
            tradingData: [],
            brandData: []
        };
    }

    componentDidMount() {
        // const brandsCondition = {
        //     page: 0,
        //     size: 24
        // };
        const enterprisesCondition = {
            page: 0,
            size: 24
        };
        // getShopBrandsData(brandsCondition).then(res => {
        //     if (res.content && res.content.length > 0) {
        //         let result = [];
        //         for (let i = 0; i < res.content.length; i += 8) {
        //             result.push(res.content.slice(i, i + 8));
        //         }
        //         this.setState({brandData: result || []})
        //     }
        // });
        getShopEnterprises(enterprisesCondition).then(res => {
            if (res.data.content && res.data.content.length > 0) {
                let result = [];
                for (let i = 0; i < res.data.content.length; i += 12) {
                    result.push(res.data.content.slice(i, i + 12));
                }
                this.setState({tradingData: result || []})
            }
        });
    }

    render() {
        const {viewTitle, tradingData, /* brandData*/} = this.state;
        const tradingKeys = {
            companyName: 'companyName',
            desc: 'companyDetailed',
            imgurl: 'companyUrl'
        };
        // const brandKeys = {
        //     title: 'companyName',
        //     imgUrl: 'companyUrl',
        // };
        return (
            <div className={style.trading_view_wrapper}>
                <Row gutter={20}>
                    <Col span={24}>
                        <ViewTitle data={viewTitle}/>
                    </Col>
                    <Col span={24}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">
                            <span className='fs18'>推荐企业</span>
                        </Divider>}
                              extra={ <a className="fs14">更多></a>}>
                            <Carousel autoplay={true}>
                                {tradingData && tradingData.map((rItem, rIndex) => {
                                    return ( <Row key={rIndex} gutter={20}>
                                        {rItem && rItem.map((cItem, cIndex) => {
                                            return (
                                                <Col key={cIndex} span={4}>
                                                    <TJQYCard data={cItem} {...tradingKeys}/>
                                                </Col>)
                                        })}
                                    </Row>)
                                })}

                            </Carousel>
                        </Card>
                    </Col>
                    {/*<Col span={6}>*/}
                    {/*<Card bordered={false} size="small" title={<Divider orientation="left">品牌馆</Divider>}*/}
                    {/*extra={ <a>更多></a>}>*/}
                    {/*<Carousel autoplay={true}>*/}
                    {/*{brandData && brandData.map((rItem, rIndex) => {*/}
                    {/*return ( <Row key={rIndex} gutter={20}>*/}
                    {/*{rItem && rItem.map((cItem, cIndex) => {*/}
                    {/*return (*/}
                    {/*<Col key={cIndex} span={12} className={cIndex < 6 ? 'mb20' : ''}>*/}
                    {/*<PPGCard data={cItem} {...brandKeys}/>*/}
                    {/*</Col>)*/}
                    {/*})}*/}
                    {/*</Row>)*/}
                    {/*})}*/}

                    {/*</Carousel>*/}
                    {/*</Card>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        )
    }
}
