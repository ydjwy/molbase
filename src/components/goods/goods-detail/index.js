import React, {Component} from "react";
import {Card, Tabs} from "antd";
import style from './index.scss'
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

    render() {
        const {/*data: {name, phone, imgUrl},*/ selectTab} = this.state;
        const {goodsInfo} = this.props;
        const title = this.getCardTitle()
        // const showDetialContent = this.getGoodsDetialContent();
        return (
            <div className={style.goods_detail_wrapper}>
                <Card title={title} size="small" extra={<small>信息更新时间：2020.05.07</small>}>
                    {selectTab === '1' ? <div
                        dangerouslySetInnerHTML={{__html: goodsInfo.storeInfo && goodsInfo.storeInfo.description}}/> : null}
                    {selectTab === '2' ? '商品评价' : null}
                </Card>
            </div>
        );
    }
}

