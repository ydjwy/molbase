import React, {Component} from "react";
import {Descriptions, Radio, InputNumber, Button} from "antd";
import {joinCart} from '../../../services/api2'
import style from './index.scss'
const {Item} = Descriptions;

export default class GoodsDetailClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            selectedAttr: {},
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {goodsInfo: {productAttr, productValue}} = nextProps;
        this.setState({selectedAttr:productValue[productAttr[0].attrValueArr[0]]});
    }

    //选择数量
    onSelectCount = (count) => {
        this.setState({count})
    };
    //选择规格
    onChangeAttr = (attr) => {
        const {goodsInfo: {productValue}} = this.props;
        this.setState({selectedAttr:productValue[attr.target.value]})
    };
    //加入购物车
    onJoinShoppingCart = () => {
        const {goodsInfo: {storeInfo}} = this.props;
        const {count,selectedAttr}=this.state;
        const data={
            productId: storeInfo.id,  //商品id
            cartNum:count,     //商品数量
            new: 0,         //默认是否立即购买   0 是 不立即购买 1是立即购买
            uniqueId: selectedAttr.id  // 商品规格id  从商品详情接口里去拿
        }
        joinCart(data).then()
    };
    //立即购买
    onBuyNow = () => {
    }

    render() {
        const { count,selectedAttr:{price}} = this.state;
        const {goodsInfo: {storeInfo, productAttr}} = this.props;
        return (
            <div className={style.goods_detail_class_wrapper}>
                <Descriptions column={4} title={storeInfo.storeName}>
                    <Item label="品牌">{storeInfo.storeName}</Item>
                    {/*<Item label="纯度">TopPette（半支消毒）</Item>*/}
                    <Item label="货期" span={2}>3-5日</Item>
                    {/*<div>*/}
                </Descriptions>
                <div style={{background: '#f7f7f7'}} className="pt10">
                    <Descriptions>
                        <Item label="市场价" span={3}>￥{storeInfo.otPrice + '/' + storeInfo.unitName}</Item>
                        <Item label="大宗价" span={3}>￥{price + '/' + storeInfo.unitName}（请登录查看专享价）</Item>
                    </Descriptions>
                </div>
                <Descriptions column={4}>
                    {productAttr && productAttr.map((item, index) => {
                        return (
                            <Item key={index} label={item.attrName} span={4}>
                                <Radio.Group defaultValue={item.attrValueArr[0]} onChange={this.onChangeAttr}
                                             size="small">
                                    {item.attrValueArr && item.attrValueArr.map((cItem, cIndex) => {
                                        return <Radio.Button key={cIndex} sort={cIndex}
                                                             value={cItem}>{cItem}</Radio.Button>
                                    })}
                                </Radio.Group>
                            </Item>
                        )
                    }) }

                    {/*<Item label="物流配送">上海/徐汇</Item>*/}
                    <Item label="运费">{storeInfo.isPostage ? (`￥${storeInfo.postage}起`) : '包邮'} </Item>
                    <Item label="物流说明" span={3}> 销售单位 最小起订量 : 1 支</Item>
                    <Item label="商品总价" span={4}>￥{price * count}元</Item>
                </Descriptions>
                <InputNumber min={1} defaultValue={1} precision={0} className='vam' onChange={this.onSelectCount}/>
                <Button type="primary" className='vam ml10' onClick={this.onBuyNow}>立即购买</Button>
                <Button className='vam ml10' onClick={this.onJoinShoppingCart}>加入购物车</Button>
                <Descriptions>
                    <Item label="支付方式" span={3}>线下转账 在线支付</Item>
                    <Item label="发票服务" span={3}>增税普票 增税专票</Item>
                </Descriptions>
            </div>
        );
    }
}

