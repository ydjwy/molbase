import React, {Component} from "react";
import {Descriptions, Card, Tabs} from "antd";
import style from './index.scss'
const {Item} = Descriptions;
const {TabPane} = Tabs;

export default class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '郑州派尼化学试剂厂',
                phone: '1865846132465',
                imgUrl: 'http://r.molbase.net/mall_v2/product_detail/assets/images/logo-test.png'
            },
            selectTab: '1',
        };
    }

    componentDidMount() {
    }

    onTabChange = (key) => {
        this.setState({selectTab: key});
    };
    getCardTitle = () => {
        const title = (<Tabs defaultActiveKey="1" onChange={this.onTabChange}>
            <TabPane tab="商品详情" key="1"/>
            <TabPane tab="商品评价" key="2"/>
        </Tabs>);
        return title;

    };
    //商品简介
    getIntroduction = () => {
        const introduct = (<div className={style.introduct_box}>
            <Descriptions column={4}>
                <Item label="名称">单道可调移液器</Item>
                <Item label="品牌">大龙</Item>
                <Item label="纯度"> TopPette（半支消毒）</Item>
                <Item label="规格">0.5-10ul/支</Item>
                <Item label="货号">SJ22d11b13232</Item>
                <Item label="货期">3-5日</Item>
                <Item label="品牌商货号">7010101004</Item>
            </Descriptions>
        </div> );
        return introduct;

    };
    //商品详情
    getGoodsDetialContent = () => {
        const Introduct = this.getIntroduction();
        return <div>
            {Introduct}
        </div>

    };
    //商品评价
    getGoodsEvaluateContent = () => {

    };

    render() {
        const {data: {name, phone, imgUrl}, selectTab} = this.state;
        const {goodsInfo} = this.props;
        const title = this.getCardTitle()
        const showDetialContent = this.getGoodsDetialContent();
        return (
            <div className={style.goods_detail_wrapper}>
                <Card title={title} size="small" extra={<small>信息更新时间：2020.05.07</small>}>
                    {selectTab === '1' ? <div dangerouslySetInnerHTML={{__html: goodsInfo.product && goodsInfo.product.description}}/> : null}
                    {selectTab === '2' ? '商品评价' : null}
                </Card>
            </div>
        );
    }
}

