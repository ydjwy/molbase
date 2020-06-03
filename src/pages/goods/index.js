/**
 * Created by CI11840 on 2019/3/1.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Divider} from 'antd'
import globalModel from "../../store/reducers/global";
// import SearchView from "./search-view";
// import NavView from "./nav-view";
// import DataView from "./data-view";
// import TradingView from "./trading-view";
// import ServiceView from "./service-view";
// import ProductView from "./product-view";
// import GoodsView from "./goods-view";
// import BusinessView from "./business-view";
import style from './index.scss'
@connect(({global}) => ({...global}), {...globalModel.actions})

export default class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsId: ''
        }
    }

    componentWillMount() {
        this.setState({goodsId: this.props.match.params.id});
    }

    //组件装载完成
    componentDidMount() {
        this.init();
        console.log('this.props', this.props)
    }

    //组件更新
    componentWillReceiveProps(nextProps) {

    }

    //初始化
    init = (props) => {

    };


    render() {
        const {goodsId}=this.state;
        return (<div id={style.partial_wrapper}>
            <div id={style.partial_nav_wrapper}>
                {goodsId}
                导航
                {/*<NavView/>*/}
            </div>
            <div id={style.partial_data_wrapper}>
                百度增值服务，图标
                {/*<DataView/>*/}
            </div>
            {/*<div id={style.partial_trading_wrapper}>*/}
            {/*/!*交易大厅*!/*/}
            {/*<TradingView/>*/}
            {/*</div>*/}
            {/*<div id={style.partial_goods_wrapper}>*/}
            {/*/!*实力商品*!/*/}
            {/*<GoodsView/>*/}
            {/*</div>*/}
            {/*<div id={style.partial_business_wrapper}>*/}
            {/*/!*推荐企业*!/*/}
            {/*<BusinessView/>*/}
            {/*</div>*/}
            {/*<div id={style.partial_service_wrapper}>*/}
            {/*/!*服务大厅*!/*/}
            {/*<ServiceView/>*/}
            {/*</div>*/}
            {/*<div id={style.partial_product_wrapper}>*/}
            {/*/!*产品分类*!/*/}
            {/*<ProductView/>*/}
            {/*</div>*/}
            {/*<div id={style.partial_new_wrapper}>*/}
            {/*新手*/}
            {/*</div>*/}

        </div>);
    }
}
