import React, {Component} from "react";
import {Card, Divider} from "antd";
import style from './index.scss'

export default class ZYSCCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '郑州派尼化学试剂厂',
                phone: '1865846132465',
                imgUrl: 'http://r.molbase.net/mall_v2/product_detail/assets/images/logo-test.png'
            }
        };
    }

    componentDidMount() {
    }


    render() {
        const {data: {name, phone/*,imgUrl*/}} = this.state;
        return (
            <div className={style.zysc_card_wrapper}>
                <Card>
                    <Divider dashed>自营商城</Divider>
                    <div className={style.zysc_img_box}>
                        <img src={require("../../../assets/imgs/logo.png")} alt=""/>
                    </div>
                    <p className="mt10">
                        <span>商家名称</span>
                        <span className="ml20">{name}</span>
                    </p>
                    <p>
                        <span>联系电话</span>
                        <span className="ml20">{phone}</span>
                    </p>
                </Card>
            </div>
        );
    }
}

