import React, {Component} from "react";
import {Row, Col} from "antd";
import ViewTitle from '../../../components/partial/view-title'
import CPFLCard from '../../../components/partial/cpfl-card'
import style from './index.scss'


export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                // title: '产品分类导航',
                url: require('../../../assets/imgs/产品分类导航.png')
            },
            productData: [
                {
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                }, {
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                }, {
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                }, {
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                },{
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                },{
                    title: '生物医药及化学品',
                    list: [
                        {id: 1, title: '磷酸锌', url: ''},
                        {id: 2, title: '硫酸铜', url: ''},
                        {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
                        {id: 4, title: '钨酸钙）', url: ''},
                        {id: 5, title: '氟化锰(II)）', url: ''},
                        {id: 6, title: '氟化铅）', url: ''}
                    ]
                },

            ],
        };
    }

    render() {
        const {viewTitle, productData} = this.state;
        return (
            <div className={style.product_view_wrapper}>
                <Row gutter={20}>
                    <Col span={24}>
                        <ViewTitle data={viewTitle}/>
                    </Col>
                    <Col span={24}>
                        <Row gutter={20}>
                            {productData && productData.map((rItem, rIndex) => {
                                return (
                                    <Col key={rIndex} span={4}>
                                        <CPFLCard data={rItem}/>
                                    </Col>)
                            })}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
