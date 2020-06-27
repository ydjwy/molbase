import React, {Component} from "react";
import {Card, Divider,  Row, Col} from "antd";
import RMSJCard from '../../../components/partial/rmsj-card'
import DPFWCard from '../../../components/partial/dpfw-card'
import  style from './index.scss'


export default class BusinessView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessData: [
                {
                    companyName: '郑州派尼化学试剂厂',
                    logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    address: '中国 河南 郑州',
                    abstract: '中原地区化学试剂批发生产厂家',
                    product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
                    isShowProduct: true
                }, {
                    companyName: '郑州派尼化学试剂厂',
                    logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    address: '中国 河南 郑州',
                    abstract: '中原地区化学试剂批发生产厂家',
                    product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
                    isShowProduct: true
                }, {
                    companyName: '郑州派尼化学试剂厂',
                    logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    address: '中国 河南 郑州',
                    abstract: '中原地区化学试剂批发生产厂家',
                    product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
                    isShowProduct: false
                }, {
                    companyName: '郑州派尼化学试剂厂',
                    logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    address: '中国 河南 郑州',
                    abstract: '中原地区化学试剂批发生产厂家',
                    product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
                    isShowProduct: false
                }, {
                    companyName: '郑州派尼化学试剂厂',
                    logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    address: '中国 河南 郑州',
                    abstract: '中原地区化学试剂批发生产厂家',
                    product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
                    isShowProduct: false
                }
            ]

        };
    }

    render() {
        const {businessData} = this.state;
        return (
            <div className={style.business_view_wrapper}>
                <Row gutter={20}>
                    <Col span={18}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">热门商家</Divider>}
                              extra={ <a>更多></a>}>
                            <Row gutter={20}>
                                {businessData && businessData.map((rItem, rIndex) => {
                                    return (<Col key={rIndex} className={rIndex < 2 ? '' : 'mt20'} span={rIndex < 2 ? 12 : 8}>
                                        <RMSJCard data={rItem}/>
                                    </Col>)
                                })}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">店铺服务</Divider>}
                              extra={ <a>更多></a>}>
                            <DPFWCard/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
