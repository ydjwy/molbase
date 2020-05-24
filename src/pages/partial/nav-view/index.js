import React, {Component} from "react";
import {Card, Divider, Carousel,Row, Col} from "antd";
import NavMenu from '../../../components/nav-menu'
import FWDTCard from '../../../components/fwdt-card'
import style from './index.scss'


export default class NavView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                title: '服务大厅',
                url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
            },
            navData: {
                list: [
                    {id: '0', name: '目录1', children: [{id: '0-0', name: '目录1选项1'}, {id: '0-1', name: '目录1选项2'}]},
                    {id: '2', name: '目录2', children: [{id: '2-0', name: '目录2选项1'}, {id: '2-1', name: '目录2选项2'}]},
                    {id: '3', name: '目录3', children: [{id: '3-0', name: '目录3选项1'}, {id: '3-1', name: '目录3选项2'}]},
                    {id: '4', name: '目录4', children: [{id: '4-0', name: '目录4选项1'}, {id: '4-1', name: '目录4选项2'}]}
                ]
            },
            carouselData: [
                {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                },

            ],
        };
    }

    render() {
        const {navData, carouselData} = this.state;
        return (
            <div className={style.nav_view_wrapper}>
                <Row gutter={20}>
                    <Col span={5}>
                        <NavMenu data={navData}/>
                    </Col>
                    <Col span={13}>
                        <Carousel autoplay>
                            {carouselData&&carouselData.map((item,index)=>{
                                return (<div>
                                    <img src={item.imgUrl} width="100%" height="420" alt=""/>
                                </div>)
                            })}
                        </Carousel>
                    </Col>
                    <Col span={6}>
                        123456
                        {/*<NavMenu/>*/}
                    </Col>
                </Row>
            </div>
        )
    }
}
