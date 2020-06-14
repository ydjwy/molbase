/**
 * Created by CI11840 on 2019/3/1.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import { Row, Col} from 'antd'
import globalModel from "../../store/reducers/global";
import  SpzsCard from '../../components/goods/spzs-card'
import  ZYSCCard from '../../components/goods/zysc-card'
import  DPKFCard from '../../components/goods/dpkf-card'
import  GoodsDetailClass from '../../components/goods/goods-detail-class'
import  GoodsDetail from '../../components/goods/goods-detail'
import  {getGoodsDetailInfo} from '../../services/api1'
import style from './index.scss'
@connect(({global}) => ({...global}), {...globalModel.actions})

export default class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsInfo: {
                product:{},
                productAttr:{}
            }
        }
    }

    componentWillMount() {
        this.setState({goodsId: this.props.match.params.id});
    }

    //组件装载完成
    componentDidMount() {
        getGoodsDetailInfo({id: this.props.match.params.id}).then(res => {
            console.log('res', res);
            this.setState({goodsInfo: res.data})
        })
        // this.init();
    }

    //组件更新
    componentWillReceiveProps(nextProps) {

    }

    //初始化
    init = (props) => {

    };
    getSpzsCardData = () => {
        const {goodsInfo} = this.state;
        console.log()
        const data = {
            image: goodsInfo.product.image,
            imageList: goodsInfo.product.sliderImage ? goodsInfo.product.sliderImage.split(',') : [],
            art: goodsInfo.product.barCode,
            integral: goodsInfo.product.giveIntegral,
        };
        return data
    };


    render() {
        const {goodsInfo} = this.state;
        const spzsCardData = this.getSpzsCardData();
        return (<div id={style.goods_wrapper}>
            <div className={style.goods_box}>
                <Row gutter={10}>
                    <Col span={6}>
                        <div id={style.partial_nav_wrapper}>
                            <SpzsCard data={spzsCardData}/>
                            {/*<NavView/>*/}
                        </div>
                    </Col>
                    <Col span={18}>
                        <div id={style.partial_data_wrapper}>
                            <GoodsDetailClass goodsInfo={goodsInfo}/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={5}>
                        <div id={style.partial_nav_wrapper}>
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
                            <GoodsDetail goodsInfo={goodsInfo}/>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>);
    }
}
