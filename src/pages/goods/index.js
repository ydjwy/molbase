/**
 * Created by CI11840 on 2019/3/1.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Row, Col} from 'antd'
import globalModel from "../../store/reducers/global";
import  SpzsCard from '../../components/goods/spzs-card'
import  ZYSCCard from '../../components/goods/zysc-card'
import  DPKFCard from '../../components/goods/dpkf-card'
import  GoodsDetailClass from '../../components/goods/goods-detail-class'
import  GoodsDetail from '../../components/goods/goods-detail'
import  {findGoodsDetail} from '../../services/api2'
import style from './index.scss'
@connect(({global}) => ({...global}), {...globalModel.actions})

export default class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsInfo: {
                storeInfo:{},
                productAttr: [],
                productValue:{}
            }
        }
    }

    componentWillMount() {
        this.setState({goodsId: this.props.match.params.id});
    }

    //组件装载完成
    componentDidMount() {
        findGoodsDetail(this.props.match.params.id || '').then(res => {
            this.setState({goodsInfo: res.data})
        })
        // this.init();
    }

    //组件更新
    componentWillReceiveProps(nextProps) {

    }

    getSpzsCardData = () => {
        const {goodsInfo} = this.state;
        const data = {
            image: goodsInfo.storeInfo.image,
            imageList: goodsInfo.storeInfo.sliderImageArr|| [],
            art: goodsInfo.storeInfo.barCode,
            integral: goodsInfo.storeInfo.giveIntegral,
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
