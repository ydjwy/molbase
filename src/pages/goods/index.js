/**
 * Created by CI11840 on 2019/3/1.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Divider,Row,Col} from 'antd'
import globalModel from "../../store/reducers/global";
import  SpzsCard from '../../components/spzs-card'
import  ZYSCCard from '../../components/zysc-card'
import  DPKFCard from '../../components/dpkf-card'
import  GoodsDetailClass from '../../components/goods-detail-class'
import  GoodsDetail from '../../components/goods-detail'
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
        return (<div id={style.goods_wrapper}>
            <div className={style.goods_box}>
                <Row gutter={10}>
                    <Col span={6}>
                        <div id={style.partial_nav_wrapper}>
                            {/*{goodsId}*/}
                            <SpzsCard/>
                            {/*<NavView/>*/}
                        </div>
                    </Col>
                    <Col span={18}>
                        <div id={style.partial_data_wrapper}>
                            <GoodsDetailClass/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={5}>
                        <div id={style.partial_nav_wrapper}>
                            {/*{goodsId}*/}
                            <div>
                                <ZYSCCard/>
                            </div>
                            <div className="mt10">
                                <DPKFCard/>
                            </div>
                        </div>
                    </Col>
                    <Col span={19}>
                        <div id={style.partial_data_wrapper}>
                            <GoodsDetail/>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>);
    }
}
