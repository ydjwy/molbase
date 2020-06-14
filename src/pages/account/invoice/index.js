/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Empty} from "antd";
import PageTitle from '../../../components/account/page-title'
import BaseInfo from '../../../components/account/base-info'
import style from "./index.scss";
export default class AccountInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.info = {
            ordinary: {
                title: '增值税普通发票',
                text: '尚未添加增值税普票信息',
                textList: [],
                btnText: '立即添加'
            },
            special: {
                title: '增值税专项发票',
                text: '尚未添加增值税专票信息',
                textList: [],
                btnText: '立即添加'
            }
        };
    }

    componentDidMount() {
    }

    //完善增值税普通发票
    onPerfectOrdinary = () => {
        console.log('onPerfectOrdinary');
    };
    //完善增值税专项发票
    onPerfectSpecial = () => {
        console.log('onPerfectSpecial');
    };


    render() {
        const info = this.info;
        return (<div id={style.account_invoice_wrapper}>
            <div className="mb20">
                <PageTitle title="发票类型"/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.ordinary} onOpen={this.onPerfectOrdinary}/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.special} onOpen={this.onPerfectSpecial}/>
            </div>
            <div className="mb20">
                <PageTitle title="发票接收方式"/>
                <div className="mt20">
                    <Empty description="暂无收票信息"/>
                </div>
            </div>
        </div>);
    }
}
