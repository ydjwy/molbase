import React, {Component} from "react";
import {Card, Divider, Row, Col} from "antd";
import SLSPCard from '../../../components/partial/slsp-card'
import {getStoreProduct} from '../../../services/api1'

import  style from './index.scss'


export default class GoodsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData: []

        };
    }
    componentDidMount(){
        const productCondition={
            page:0,
            size:8,
            sort:'sort,desc'
        };
        getStoreProduct(productCondition).then(res=>{
            this.setState({goodsData:res.data.content||[]})
        })
    }

    render() {
        const {goodsData} = this.state;
        const goodKeys={
            title : 'productTitle',
            name : 'storeName',
            summary : 'storeInfo',
            url : 'image',
            price : 'price',
            unit : 'unitName'
        }
        return (
            <div className={style.goods_view_wrapper}>
                <Row gutter={20}>
                    <Col span={18}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">实力商品</Divider>}
                              extra={ <a>更多></a>}>
                            <Row gutter={20}>
                                {goodsData && goodsData.map((rItem, rIndex) => {
                                    return (<Col key={rIndex} span={6} className='mb20'>
                                        <SLSPCard data={rItem} {...goodKeys}/>
                                    </Col>)
                                })}
                            </Row>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} size="small" title={<Divider orientation="left">采购服务</Divider>}
                              extra={ <a>更多></a>}>
                            <img width="100%" src="http://img.molbase.net/4e/5a/fg/10291.png" alt=""/>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
