/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import PageTitle from '../../../components/account/page-title'
import BaseInfo from '../../../components/account/base-info'
import OrdinaryModal from './ordinary-modal'
import SpecialModal from './special-modal'
import AddressModal from './address-modal'
import {getOrdinvoice, getVatinvoice, getReceiveAddress} from '../../../services/api2'
import style from "./index.scss";
@connect(({user}) => ({...user}), {...userModel.actions})
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
            },
            addressModal: {//发票接收信息弹框
                visible: false,
                isEdit: false
            },
            ordinvoiceInfo: {},//普通发票信息
            vatinvoiceInfo: {},//专项发票信息
            receiveAddressInfo: {},//接收方式信息
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
            },
            address: {
                title: '发票接收方式',
                text: '暂无接收信息',
                textList: [],
                btnText: '立即添加'
            },

        };
    }

    componentDidMount() {
        this.initOrdinvoice();
        this.initVatinvoice();
        this.initReceiveAddress();

    }

    //获取普通发票信息
    initOrdinvoice = () => {
        const {userInfo: {user}} = this.props;
        getOrdinvoice({uid: user.uid}).then(res => {
            if (res.status === 200) {
                this.setState({ordinvoiceInfo: res.data});
            }
        })
    };
    //获取专项发票信息
    initVatinvoice = () => {
        const {userInfo: {user}} = this.props;
        getVatinvoice({uid: user.uid}).then(res => {
            if (res.status === 200) {
                this.setState({vatinvoiceInfo: res.data});
            }
        })
    };
    //获取发票接收方式信息
    initReceiveAddress = () => {
        const {userInfo: {user}} = this.props;
        getReceiveAddress({uid: user.uid}).then(res => {
            if (res.status === 200) {
                this.setState({receiveAddressInfo: res.data});
            }
        })
    }

    //完善增值税普通发票
    onPerfectOrdinary = () => {
        this.setState({ordinaryModal: {visible: true, isEdit: false}});
    };
    //完善增值税专项发票
    onPerfectSpecial = () => {
        this.setState({specialModal: {visible: true, isEdit: false}});
    };
    //添加发票接收信息
    onPerfectAddress = () => {
        this.setState({addressModal: {visible: true, isEdit: false}});
    };
    //关闭普通发票弹框
    onCloseOrdinaryModal = () => {
        this.setState({ordinaryModal: {visible: false, isEdit: false}});
    };
    //关闭专项发票弹框
    onCloseSpecialModal = () => {
        this.setState({specialModal: {visible: false, isEdit: false}});
    };
    //关闭发票接收信息弹框
    onCloseAddressModal = () => {
        this.setState({addressModal: {visible: false, isEdit: false}});
    };

    render() {
        const {ordinaryModal, specialModal, addressModal, ordinvoiceInfo, vatinvoiceInfo, receiveAddressInfo} = this.state;
        const info = this.info;
        return (<div id={style.account_invoice_wrapper}>
            <div className="mb20">
                <PageTitle title="发票类型"/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.ordinary} isHaveContent={ordinvoiceInfo.isExist}
                          isEdit={ordinvoiceInfo.isExist} onOpen={this.onPerfectOrdinary}>普通发票</BaseInfo>
            </div>
            <div className="mb20">
                <BaseInfo {...info.special} isHaveContent={vatinvoiceInfo.isExist}
                          isEdit={vatinvoiceInfo.isExist} onOpen={this.onPerfectSpecial}>专项发票</BaseInfo>
            </div>
            <div className="mb20">
                <BaseInfo {...info.address} isHaveContent={receiveAddressInfo.isExist}
                          isEdit={receiveAddressInfo.isExist} onOpen={this.onPerfectAddress}>接收方式</BaseInfo>
            </div>
            {ordinaryModal.visible ?
                <OrdinaryModal ordinaryModal={ordinaryModal} onClose={this.onCloseOrdinaryModal}/> : null}
            {specialModal.visible ?
                <SpecialModal specialModal={specialModal} onClose={this.onCloseSpecialModal}/> : null}
            {addressModal.visible ?
                <AddressModal addressModal={addressModal} onClose={this.onCloseAddressModal}/> : null}
        </div>);
    }
}
