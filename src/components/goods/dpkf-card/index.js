import React, {Component} from "react";
import {Card, Icon, Avatar, Typography, Tabs, Row, Col, Divider} from "antd";
import style from './index.scss'

export default class DPKFCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title:'店铺客服',
                name: '郑州派尼化学试剂厂',
                phone:'1865846132465',
                imgUrl: 'http://r.molbase.net/mall_v2/product_detail/assets/images/logo-test.png'
            }
        };
    }

    componentDidMount() {
    }


    render() {
        const {data: {name, phone,title}} = this.state;
        return (
            <div className={style.dpkf_card_wrapper}>
                <Card size="small" title={title} >
                    <h3>工作时间</h3>
                    <p className="mt10">
                        <span>周一到周五 ：</span>
                        <span>9:00-18:00</span>
                    </p>
                    <Divider dashed />
                    <h3>联系方式</h3>
                    <p>
                        <span>电话：</span>
                        <span >400-6021-666 转 2</span>
                    </p>
                    <p>
                        <span>QQ：</span>
                        <span>4007281666</span>
                    </p>
                </Card>
            </div>
        );
    }
}

