/**
 * Created by CI11840 on 2019/6/3.
 */
import React, {Component} from "react";
import {Popover, Badge, Button, message} from "antd";
import {navMyCart, delMyCartGoods} from '../../../services/api2'
import style from './index.scss'
export default class HeaderCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shoppingCartInfo: {}
        };
    }

    //装载完成
    componentDidMount() {
        this.init();
    }

    // 初始化
    init = () => {
        navMyCart().then(res => {
            if (res.status === 200) {
                this.setState({shoppingCartInfo: res.data});
            }
        })
    };
    //组件更新
    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {shoppingCartInfo} = this.state;
        return (<React.Fragment>
            <Popover content={<CartInfo shoppingCartInfo={shoppingCartInfo} onUpDateList={this.init}/>}
                     overlayStyle={{width: 400}}
                     placement="bottomRight">
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

    //跳转购物车详情
    onToShoppingCart = () => {
        window.location.href = '/#/shopping-cart';
    };
    //删除商品
    onDeleteCart = (data) => {
        const {onUpDateList} = this.props;
        delMyCartGoods({ids: [data.id]}).then(res => {
            if (res.status === 200) {
                message.success(res.msg)
                onUpDateList();
            }
        })
    }
    //计算总价
    onComputerTotal = (arr) => {
        let total = 0;
        arr.forEach(item => {
            total += item.price * item.cartNum;
        });
        return total;
    }

    render() {
        const {shoppingCartInfo: {proatrr, total}} = this.props;
        return (<div className={style.header_cart_info}>
            <ul>
                {proatrr.map(item => {
                    return (<li style={{borderBottom: '1px dashed #E8E8E8'}} key={item.id}>
                        <h4>
                            <span className="dib w40 ellipsis" title={item.storeName}>
                                <img src={item.image} className="vam mr5" width="20" alt="" height="20"/>
                                <span className="vam">{item.storeName}</span>
                            </span>
                            <small className="dib w20 pr10 ellipsis">{item.suk}</small>
                            <small className="dib w30 ellipsis" align="right"
                                   title={`￥${item.price}/单位 X ${item.cartNum}`}>{`￥${item.price}/${item.unitName} X ${item.cartNum}`}</small>
                            <small className="dib w10 ellipsis">&nbsp; <a className="fs12"
                                                                          onClick={() => this.onDeleteCart(item)}>删除</a>
                            </small>
                        </h4>
                    </li>);
                })}

            </ul>
            <p className="mt10">
                <span>共</span>
                <span>{total}</span>
                <span>件商品</span>
                <span>合计</span>
                <span className="mr10">￥{this.onComputerTotal(proatrr)}</span>
                <Button type="danger" size='small' onClick={this.onToShoppingCart}>查看购物车</Button>
            </p>
        </div>);
    }
}