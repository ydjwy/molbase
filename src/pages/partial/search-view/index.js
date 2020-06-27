import React, {Component} from "react";
import {Icon, Row, Col, Menu} from "antd";
import style from './index.scss'


export default class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ]
        };
    }

    handleMenuClick = () => {
    };

    render() {
        const {menuData} = this.state;
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
