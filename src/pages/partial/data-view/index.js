import React, {Component} from "react";
import {Row, Col} from "antd";
import SCZXCard from '../../../components/partial/sczx-card'
import BDZZCard from '../../../components/partial/bdzz-card'
import TabCharts from '../../../components/partial/tab-charts'
import  style from './index.scss'


export default class DataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sevice: {

                title: '百度增值服务',
                list: [
                    {name: '市场分析', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
                    {name: '数据接口', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
                    {name: '定制合成', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'},
                    {name: '注册', url: 'http://img.molbase.net/0s/r2/ua/10327.jpeg'}
                ]

            },
            charts: {
                list: [
                    {name: '涂料及原料', type: '1', text: ''},
                    {name: '醇类', type: '2', text: ''},
                    {name: '合纤原料', type: '3', text: ''},
                    {name: '无机化工', type: '4', text: ''},
                    {name: '增塑剂', type: '5', text: ''},
                    {name: '其他有机', type: '6', text: ''}
                ]
            },
            information: {
                title: '市场资讯',
                list: [
                    {name: '市场分析', type: '装置', title: '[PP粒]:1国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
                    {name: '数据接口', type: '装置', title: '[PP粒]:2国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
                    {name: '定制合成', type: '装置', title: '[PP粒]:3国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
                    {name: '定制合成', type: '装置', title: '[PP粒]:4国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
                    {name: '定制合成', type: '装置', title: '[PP粒]:5国内PP装置检修及未来检修计划一览表（20200515）', url: ''},
                    {name: '注册', type: '装置', title: '[PP粒]:6国内PP装置检修及未来检修计划一览表（20200515）', url: ''}
                ]
            }
        };
    }

    render() {
        const {sevice, charts, information} = this.state;
        return (
            <div className={style.data_view_wrapper}>
                <Row gutter={20}>
                    <Col span={5}>
                        <BDZZCard data={sevice}/>
                    </Col>
                    <Col span={13}>
                        <TabCharts data={charts}/>
                    </Col>
                    <Col span={6}>
                        <SCZXCard data={information}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
