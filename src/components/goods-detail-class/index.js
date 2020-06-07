import React, {Component} from "react";
import {Descriptions,Radio,InputNumber,Button } from "antd";
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
            }
        };
    }

    componentDidMount() {
    }


    render() {
        const {data: {name, phone, imgUrl}} = this.state;
        return (
            <div className={style.goods_detail_class_wrapper}>
                <Descriptions column={4} title="单道可调移液器">
                    <Item label="品牌">大龙</Item>
                    <Item label="纯度">TopPette（半支消毒）</Item>
                    <Item label="货期" span={2}>3-5日</Item>
                    {/*<div>*/}
                </Descriptions>
                <div style={{background:'#f7f7f7'}} className="pt10">
                    <Descriptions>
                        <Item label="市场价" span={3}>￥680.00/支</Item>
                        <Item label="摩贝价"  span={3}>￥275.00 /支 （请登录查看专享价）</Item>
                    </Descriptions>
                </div>
                <Descriptions column={4}>
                    <Item label="选择规格" span={4}>
                        <Radio.Group defaultValue="a" size="small">
                            <Radio.Button value="a">Hangzhou</Radio.Button>
                            <Radio.Button value="b">Shanghai</Radio.Button>
                            <Radio.Button value="c">Beijing</Radio.Button>
                            <Radio.Button value="d">Chengdu</Radio.Button>
                        </Radio.Group>
                    </Item>
                    <Item label="物流配送" >上海/徐汇</Item>
                    <Item label="运费" >￥6 起</Item>
                    <Item label="物流说明" span={2}> 销售单位 最小起订量 : 1  支</Item>
                    <Item label="商品总价" span={4}>￥275.00元</Item>
                </Descriptions>
                <InputNumber min={1} defaultValue={1} precision={0} className='vam'/>
                <Button type="primary" className='vam ml10'>立即购买</Button>
                <Button className='vam ml10'>加入购物车</Button>
                <Descriptions>
                    <Item label="支付方式" span={3}>线下转账 在线支付</Item>
                    <Item label="发票服务"  span={3}>增税普票 增税专票</Item>
                </Descriptions>
            </div>
        );
    }
}

