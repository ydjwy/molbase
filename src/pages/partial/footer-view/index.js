import React, {Component} from "react";
import {Row, Col, Card} from "antd";
import  style from './index.scss'
const logo = require("../../../assets/imgs/logo.png");

export default class FooterView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6]
        return (
            <div className={style.footer_view_wrapper}>
                <Row type="flex" align="middle">
                    <Col span={4} align="center">
                        <img src={logo} width="150" alt=""/>
                    </Col>
                    <Col span={16}>
                        <Row gutter={10}>
                            {arr.map(item => {
                                return (<Col span={4} key={item}>
                                    <Card bordered={false} size="small" title={<span className="fwb">实力产品</span>}>
                                        <p>实力产品</p>
                                        <p>实力产品</p>
                                        <p>实力产品</p>
                                        <p>实力产品</p>
                                    </Card>
                                </Col>);
                            })}
                        </Row>
                    </Col>
                    <Col span={4}>
                        <div style={{width: 100, height: 100, background: 'rgb(8,92,160)'}}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
