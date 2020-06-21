import React, {Component} from "react";
import {Icon, Row, Col, Menu} from "antd";
import style from './index.scss'


export default class SearchView extends Component {
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

            menuData: [
                {id: 1, name: '现货商城'},
                {id: 2, name: '实验室用品'},
                {id: 3, name: '业务管理'},
                {id: 4, name: '品牌馆'},
                {id: 5, name: '化工企业'},
                {id: 6, name: '化工产品'},
                {id: 7, name: '大宗百科'},
                {id: 8, name: '大宗行情'},
                {id: 9, name: '产业链地图'},
            ],

        };
    }

    handleMenuClick = () => {
    };

    render() {
        const {menuData, carouselData, welcomeData} = this.state;
        return (
            <div className={style.search_view_wrapper}>
                <Row gutter={20}>
                    <Col span={5}>
                        <h2 style={{height: 47, lineHeight: '47px', background: '#1d5edc', color: '#fff', margin: 0}}
                            align="center">
                            <Icon type="unordered-list" className="mr5"/>全部产品导航
                        </h2>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.handleMenuClick} selectedKeys="" mode="horizontal">
                            {menuData && menuData.map(item => {
                                return (
                                    <Menu.Item key={item.id}>
                                        {item.name}
                                    </Menu.Item>);
                            })}
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}
