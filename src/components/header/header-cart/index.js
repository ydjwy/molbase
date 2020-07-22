/**
 * Created by CI11840 on 2019/6/3.
 */
import React, {Component} from "react";
import {Popover, Badge, Button} from "antd";
import {navMyCart} from '../../../services/api2'
import style from './index.scss'
export default class HeaderCart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //装载完成
    componentDidMount() {
        navMyCart().then(res => {
            console.log('res', res);
        })
    }

    //组件更新
    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (<React.Fragment>
            <Popover content={<CartInfo/>}>
                <span style={{color: "#fff"}} className="cp">购物车<Badge dot={true}/></span>
            </Popover>
        </React.Fragment>);
    }
}

class CartInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //装载完成
    componentDidMount() {
    }

    //组件更新
    componentWillReceiveProps(nextProps) {
    }

    onToShoppingCart = () => {
        window.location.href = '/#/shopping-cart';
    };

    render() {
        return (<div className={style.header_cart_info}>
            <ul>
                <li style={{borderBottom: '1px dashed #E8E8E8'}}>
                    <h4>
                        <span className="dib w60 ellipsis" title="单道可调移液器">单道可调移液器</span>
                        <small className="dib w40 ellipsis" title="￥275.00/支 X 2">￥275.00/支 X 2</small>
                    </h4>
                    <p align="right">
                        <a>删除</a>
                    </p>
                </li>
            </ul>
            <p className="mt10">
                <span>共</span>
                <span>2</span>
                <span>件商品</span>
                <span>合计</span>
                <span className="mr10">￥12,124.00</span>
                <Button type="danger" size='small' onClick={this.onToShoppingCart}>查看购物车</Button>
            </p>
        </div>);
    }
}