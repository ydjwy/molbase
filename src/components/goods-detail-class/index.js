import React, {Component} from "react";
import {Descriptions, Radio, InputNumber, Button} from "antd";
import style from './index.scss'
const {Item} = Descriptions;

export default class GoodsDetailClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '郑州派尼化学试剂厂',
                phone: '1865846132465',
                imgUrl: 'http://r.molbase.net/mall_v2/product_detail/assets/images/logo-test.png'
            },
            price: '',
            count: 1,
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const {goodsInfo: {productAttr}} = nextProps;
        this.setState({price: productAttr.value[0].price})
    }

    onSelectCount = (count) => {
        this.setState({count})
    };
    onChangeAttr = (attr) => {
        const {goodsInfo: {productAttr}} = this.props;
        this.setState({price: productAttr.value[attr.target.sort].price})
        //
        console.log('attr', attr)
    }

    render() {
        const {price, count} = this.state;
        const {goodsInfo: {product, productAttr}} = this.props;
        return (
            <div className={style.goods_detail_class_wrapper}>
                <Descriptions column={4} title={product.storeName}>
                    <Item label="品牌">{product.storeName}</Item>
                    {/*<Item label="纯度">TopPette（半支消毒）</Item>*/}
                    <Item label="货期" span={2}>3-5日</Item>
                    {/*<div>*/}
                </Descriptions>
                <div style={{background: '#f7f7f7'}} className="pt10">
                    <Descriptions>
                        <Item label="市场价" span={3}>￥{product.otPrice + '/' + product.unitName}</Item>
                        <Item label="大综价" span={3}>￥{price + '/' + product.unitName}（请登录查看专享价）</Item>
                    </Descriptions>
                </div>
                <Descriptions column={4}>
                    {productAttr && productAttr.attr && productAttr.attr.map((item, index) => {
                        return (
                            <Item key={index} label={item.value} span={4}>
                                <Radio.Group defaultValue={item.detail[0]} onChange={this.onChangeAttr} size="small">
                                    {item.detail && item.detail.map((cItem, cIndex) => {
                                        return <Radio.Button key={cIndex} sort={cIndex}
                                                             value={cItem}>{cItem}</Radio.Button>
                                    })}
                                </Radio.Group>
                            </Item>
                        )
                    }) }

                    {/*<Item label="物流配送">上海/徐汇</Item>*/}
                    <Item label="运费">{product.isPostage ? (`￥${product.postage}起`) : '包邮'} </Item>
                    <Item label="物流说明" span={3}> 销售单位 最小起订量 : 1 支</Item>
                    <Item label="商品总价" span={4}>￥{price * count}元</Item>
                </Descriptions>
                <InputNumber min={1} defaultValue={1} precision={0} className='vam' onChange={this.onSelectCount}/>
                <Button type="primary" className='vam ml10'>立即购买</Button>
                <Button className='vam ml10'>加入购物车</Button>
                <Descriptions>
                    <Item label="支付方式" span={3}>线下转账 在线支付</Item>
                    <Item label="发票服务" span={3}>增税普票 增税专票</Item>
                </Descriptions>
            </div>
        );
    }
}

