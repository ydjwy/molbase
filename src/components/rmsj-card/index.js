import React, {Component} from "react";
import {Card, Icon, Avatar, Typography} from "antd";
import style from './index.scss'
const {Meta} = Card;
const {Paragraph} = Typography;
// data: {
//     companyName: '郑州派尼化学试剂厂',
//         logo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         address: '中国 河南 郑州',
//         abstract: '中原地区化学试剂批发生产厂家',
//         product: '六氟铝酸钠,钼酸钠,硅酸钠,硝普钠（亚硝基铁氰化钠）,硫酸铝钾,柠檬酸钾,氟铝酸钾,六氯铂酸钾,苯甲酸钾,钼酸钾',
//         isShowProduct: true
// }
export default class RMSJCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        const {data: {companyName, address, abstract, product, logo, isShowProduct}} = this.props;
        return (
            <div className={style.rmsj_card_wrapper}>
                <Card >
                    <Meta style={{backgroundColor: '#FFFCF5'}}
                          avatar={<Avatar size="large" src={logo}/>}
                          title={companyName}
                          description={`地址：${address}`}
                    />
                    <div className={style.rmsj_abstract}
                         style={{color: '#BF8F00', background: '#FFF6DA'}}>{abstract}</div>
                    {isShowProduct && (<div style={{padding: 20}}>
                        <Paragraph ellipsis={{rows: 3}} style={{WebkitBoxOrient: 'vertical'}}>
                            <b>主打产品：</b>
                            {product}
                        </Paragraph>
                    </div>)}

                </Card>
            </div>
        );
    }
}

