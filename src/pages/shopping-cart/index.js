import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Divider, Steps} from "antd";
import  CartStep1 from './cart-step1'
import  CartStep2 from './cart-step2'
import  CartStep3 from './cart-step3'
import {createOrder} from '../../services/api2'
import  style from './index.scss'
const {Step} = Steps;
const logo = require("../../assets/imgs/logo.png");

@connect(({user}) => ({...user}), {...userModel.actions})
export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,//当前所在流程
            selectedGoods: '',//选中的商品
        };
    }

    componentWillMount() {
        const newData = localStorage.getItem('newData');
        // localStorage.removeItem('newData');
        if (newData) {
            const cartData = JSON.parse(newData);
            if (cartData && cartData.cartId) {
                this.setState({currentStep: 1, selectedGoods: cartData.cartId});
            }
        }

    }

    //返回购物车
    onBackCart = () => {
        this.setState({currentStep: 0});
    };
    //立即结算
    onSettlement = (goods) => {
        this.setState({currentStep: 1, selectedGoods: goods.join(',')});
    };
    //提交订单
    onSubmitOrder = (data) => {
        createOrder(data).then(res => {
            if (res.status === 200) {
                this.setState({currentStep: 2});
            }
        });
    };
    //付款
    onPayment = () => {
        console.log('pay')
    };

    render() {
        const {userInfo} = this.props;
        const {currentStep, selectedGoods} = this.state;
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
                        {currentStep === 1 ? <CartStep2 onSubmit={this.onSubmitOrder} onBack={this.onBackCart}
                                                        userInfo={userInfo} goodsId={selectedGoods}/> : null}
                        {currentStep === 2 ? <CartStep3 onSubmit={this.onPayment}/> : null}
                    </div>
                </div>

            </div>
        )
    }
}
