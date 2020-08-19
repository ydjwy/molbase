/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Radio, Select, Input, Button} from 'antd';
import PageTitle from '../../../components/account/page-title'
import {getOrderList} from '../../../services/api2'
import style from "./index.scss";
const {Option} = Select;
const {Search} = Input;
@connect(({user}) => ({...user}), {...userModel.actions})
export default class PlatformOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        };
        this.condition = {
            page: 1,
            limit: 20,
            type: 0
        };

    }

    componentDidMount() {
        const condition = this.condition
        getOrderList(condition).then(res => {
            if (res.status === 200) {
                this.setState({orderList: res.data});
            }
        })
    }

    getShowTable = () => {
        const {orderList} = this.state;

        function wd(value) {
            return {width: value}
        };

        return (<div>
            <table border="1" className={style.table_header} cellPadding="5">
                <tbody>
                <tr>
                    <th>订单详情</th>
                    <th style={wd(100)}>单价</th>
                    <th style={wd(70)}>数量</th>
                    <th style={wd(100)}>实付款</th>
                    <th style={wd(100)}>状态</th>
                    <th style={wd(100)}>操作</th>
                </tr>
                </tbody>
            </table>
            {orderList.map(item => {
                return (<table border="1" className={style.table_content} cellPadding="5" key={item.orderId}>
                    <tbody>
                    <tr>
                        <th colSpan="7">
                            <div className="clear">
                                订单编号：{item.orderId}
                                <span className="right">2020-08-06 19:47:57</span>
                            </div>
                        </th>
                    </tr>
                    {item.cartStoreInfo.map((cItem, cIndex) => {
                        return (<tr>
                            <td>
                                <div>{cItem.productName}</div>
                                <div>{cItem.suk}</div>
                                <div>单位：{cItem.unitName}</div>
                            </td>
                            <td style={{...wd(100)}}>{cItem.price}</td>
                            <td style={{...wd(70)}}>x {cItem.cartNum}</td>
                            {cIndex === 0 && <React.Fragment>
                                <td style={wd(100)} rowSpan={item.cartStoreInfo.length}>
                                    ￥{cItem.cartNum * cItem.price}</td>
                                <td style={wd(100)} rowSpan={item.cartStoreInfo.length}>
                                    已付款
                                </td>
                                <td style={wd(100)} rowSpan={item.cartStoreInfo.length}>
                                    <Button type='primary' size='small' className='mb10'>付款</Button>
                                    <div className='mb10'><a>查看订单</a></div>
                                    <a>取消订单</a>
                                </td>
                            </React.Fragment>}

                        </tr>);
                    })}
                    </tbody>
                </table>);
            })}

        </div>);
    };

    render() {
        const showTable = this.getShowTable();
        return (<div id={style.platform_order_wrapper}>
            <div className="mb20">
                <PageTitle title="平台订单"/>
            </div>
            <div className="clear mb20">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="0">全部订单(10)</Radio.Button>
                    <Radio.Button value="1">待发货(10)</Radio.Button>
                    <Radio.Button value="2">待收货(10)</Radio.Button>
                    <Radio.Button value="3">待付款(10)</Radio.Button>
                </Radio.Group>
                <Select
                    className="right"
                    style={{width: 150}}
                    placeholder="选择时间">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                <Search style={{width: 300}} className="right  mr10"
                        placeholder="按订单编号/商品编号/名称查询"
                        enterButton="查询"
                        onSearch={value => console.log(value)}/>
            </div>
            {showTable}
        </div>);
    }
}