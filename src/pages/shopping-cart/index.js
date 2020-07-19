import React, {Component} from "react";
import {Divider, Steps} from "antd";
import  CartStep1 from './cart-step1'
import  CartStep2 from './cart-step2'
import  CartStep3 from './cart-step3'
import  style from './index.scss'
const {Step} = Steps;
const logo = require("../../assets/imgs/logo.png");


export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,//当前所在流程
        };
    }

    //返回购物车
    onBackCart = () => {
        this.setState({currentStep: 0});
    };
    //立即结算
    onSettlement = () => {
        this.setState({currentStep: 1});
    };
    //提交订单
    onSubmitOrder = () => {
        this.setState({currentStep: 2});
    };
    //付款
    onPayment = () => {
        console.log('pay')
    };

    render() {
        const {currentStep} = this.state;
        return (
            <div className={style.shopping_cart_wrapper}>
                <div className="shopping_cart_header">
                    <div style={{lineHeight: '30px'}} className="dib w40">
                        <img src={logo} alt="" height="30"/>
                        <Divider style={{height: 22, top: 0}} type="vertical"/>
                        <h3 className="dib vam mb0" style={{height: 20, lineHeight: 1}}>购物车</h3>
                    </div>
                    <div className="dib w60 vat">
                        <Steps progressDot current={currentStep}>
                            <Step description="1.我的购物车"/>
                            <Step description="2.填写核对订单信息"/>
                            <Step description="3.提交订单成功"/>
                        </Steps>
                    </div>
                    <div className="shopping_cart_content">
                        {currentStep === 0 ? <CartStep1 onSubmit={this.onSettlement}/> : null}
                        {currentStep === 1 ? <CartStep2 onSubmit={this.onSubmitOrder} onBack={this.onBackCart}/> : null}
                        {currentStep === 2 ? <CartStep3 onSubmit={this.onPayment}/> : null}
                    </div>
                </div>

            </div>
        )
    }
}
