import React, {Component} from "react";
import {Icon, Row, Col, Menu, Input, Divider} from "antd";
import style from './index.scss'
const logo = require("../../../assets/imgs/logo.png");
const {Search} = Input;


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
                <Row type="flex" align="middle" className='pt30  pb30'>
                    <Col span={4} align="center">
                        <img src={logo} width="100%" alt=""/>
                    </Col>
                    <Col span={14} offset={2}>
                        <div className="mb10 pl10">
                            <a>找商品</a>
                            <Divider type="vertical"/>
                            买现货
                        </div>
                        <Search
                            placeholder="请输入商品"
                            enterButton={<span><Icon type="search"/>搜索</span>}
                            size="large"
                            onSearch={value => console.log(value)}/>
                        <div className="mt10">
                            <span>热门搜索：</span>
                            <span className="mr10 color_hint">乙二醇</span>
                            <span className="mr10 color_hint">玉米</span>
                        </div>
                    </Col>
                    {/*<Col span={2} align="right" push={2}>*/}
                    {/*<div style={{width: 100, height: 100, background: 'rgb(8,92,160)'}}></div>*/}
                    {/*</Col>*/}
                </Row>
                <Row gutter={20}>
                    <Col span={5}>
                        <h2 style={{
                            height: 48,
                            lineHeight: '48px',
                            background: 'rgb(8,92,160)',
                            color: '#fff',
                            margin: 0
                        }}
                            align="center">
                            <Icon type="unordered-list" className="mr5"/>全部产品导航
                        </h2>
                    </Col>
                    <Col span={19}>
                        <Menu onClick={this.handleMenuClick} selectedKeys="" mode="horizontal" style={{
                            height: 48,
                            lineHeight: '48px',
                        }}>
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
