/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Empty} from "antd";
import PageTitle from '../../../components/account/page-title'
import BaseInfo from '../../../components/account/base-info'
import OrdinaryModal from './ordinary-modal'
import SpecialModal from './special-modal'
import style from "./index.scss";
export default class AccountInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordinaryModal: {//普通发票弹框
                visible: false,
                isEdit: false
            },
            specialModal: {//专项发票弹框
                visible: false,
                isEdit: false
            }
        };
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
        this.setState({ordinaryModal: {visible: true, isEdit: false}});
    };
    //完善增值税专项发票
    onPerfectSpecial = () => {
        this.setState({specialModal: {visible: true, isEdit: false}});
    };
    //关闭普通发票弹框
    onCloseOrdinaryModal = () => {
        this.setState({ordinaryModal: {visible: false, isEdit: false}});
    };
    //关闭专项发票弹框
    onCloseSpecialModal = () => {
        this.setState({specialModal: {visible: false, isEdit: false}});
    };

    render() {
        const {ordinaryModal, specialModal} = this.state;
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
            {ordinaryModal.visible ?
                <OrdinaryModal ordinaryModal={ordinaryModal} onClose={this.onCloseOrdinaryModal}/> : null}
            {specialModal.visible ?
                <SpecialModal specialModal={specialModal} onClose={this.onCloseSpecialModal}/> : null}
        </div>);
    }
}
