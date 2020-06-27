import React, {Component} from "react";
import {Row, Col} from "antd";
import ViewTitle from '../../../components/partial/view-title'
import FWDTCard from '../../../components/partial/fwdt-card'
import style from './index.scss'


export default class ServiceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                title: '服务大厅',
                url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
            },
            serviceData: [
                {
                    title: '推广服务',
                    text: '精准的化学品客群流量、丰富的化学品推广渠道。',
                    hoverText: '推广服务精准的化学品客群流量、丰富的化学品推广渠道。精准的化学品客群流量、丰富的化学品推广渠道。',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    text: '精准的化学品客群流量、丰富的化学品推广渠道。',
                    hoverText: '推广服务精准的化学品客群流量、丰富的化学品推广渠道。精准的化学品客群流量、丰富的化学品推广渠道。',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    text: '精准的化学品客群流量、丰富的化学品推广渠道。',
                    hoverText: '推广服务精准的化学品客群流量、丰富的化学品推广渠道。精准的化学品客群流量、丰富的化学品推广渠道。',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    text: '精准的化学品客群流量、丰富的化学品推广渠道。',
                    hoverText: '推广服务精准的化学品客群流量、丰富的化学品推广渠道。精准的化学品客群流量、丰富的化学品推广渠道。',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                },

            ],
        };
    }

    render() {
        const {viewTitle, serviceData} = this.state;
        return (
            <div className={style.service_view_wrapper}>
                <Row gutter={20}>
                    <Col span={24}>
                        <ViewTitle data={viewTitle}/>
                    </Col>
                    <Col span={24}>
                        <Row gutter={20}>
                            {serviceData && serviceData.map((rItem, rIndex) => {
                                return (
                                    <Col key={rIndex} span={6}>
                                        <FWDTCard data={rItem}/>
                                    </Col>)
                            })}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
