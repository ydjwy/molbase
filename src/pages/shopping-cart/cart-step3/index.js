import React, {Component} from "react";
import {Result, Button} from 'antd';
import  style from './index.scss'
export default class ShoppingCartStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //提交订单
    onPayment = () => {
        const {onSubmit} = this.props;
        onSubmit();
    };
    //去网上仓储
    toStorage = () => {
        console.log('props',this.props)
        window.location.href = '/#/account/storage-info';
    };

    render() {
        return (
            <div className={style.shopping_cart_step3_wrapper}>
                <h3 align="right">剩余时间：30:00</h3>
                <Result
                    status="success"
                    title="订单提交成功"
                    subTitle="请在30分钟内付款"
                    extra={[<Button type="primary" key="1" onClick={this.onPayment}>去付款</Button>,
                        <Button type="primary" key="2" onClick={this.toStorage}>网上仓储</Button>]}/>
            </div>
        )
    }
}
