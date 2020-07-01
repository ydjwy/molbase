/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Descriptions, Card, Row, Col} from 'antd'
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
                btnText: '立即添加',
                handleText: '新增'
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
    onPerfectOrdinary = (type) => {
        const {userInfo: {user}} = this.props;
        const {ordinvoiceInfo} = this.state;
        if (type === 'new') {
            this.setState({ordinaryModal: {visible: true, isEdit: false, uid: user.uid}});
        } else if (type === 'edit') {
            this.setState({ordinaryModal: {visible: true, isEdit: true, data: ordinvoiceInfo, uid: user.uid}});
        }

    };
    //完善增值税专项发票
    onPerfectSpecial = (type) => {
        const {userInfo: {user}} = this.props;
        const {vatinvoiceInfo} = this.state;
        if (type === 'new') {
            this.setState({specialModal: {visible: true, isEdit: false, uid: user.uid}});
        } else if (type === 'edit') {
            this.setState({specialModal: {visible: true, isEdit: true, data: vatinvoiceInfo, uid: user.uid}});
        }

    };
    //添加发票接收信息
    onPerfectAddress = (type, data) => {
        const {userInfo: {user}} = this.props;
        const addTypes = ['new', 'edit'];
        if (addTypes.includes(type)) {
            this.setState({addressModal: {visible: true, isEdit: false, uid: user.uid}});
        } else if (type === 'isEdit') {
            this.setState({addressModal: {visible: true, isEdit: true, data, uid: user.uid}});
        }

    };
    //关闭普通发票弹框
    onCloseOrdinaryModal = (isSave) => {
        if (isSave) {
            this.initOrdinvoice();
        }
        this.setState({ordinaryModal: {visible: false, isEdit: false}});
    };
    //关闭专项发票弹框
    onCloseSpecialModal = (isSave) => {
        if (isSave) {
            this.initVatinvoice();
        }
        this.setState({specialModal: {visible: false, isEdit: false}});
    };
    //关闭发票接收信息弹框
    onCloseAddressModal = (isSave) => {
        if (isSave) {
            this.initReceiveAddress();
        }
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
                          isEdit={ordinvoiceInfo.isExist} onOpen={this.onPerfectOrdinary}>
                    <OrdinaryInfoShow {...ordinvoiceInfo}/>
                </BaseInfo>
            </div>
            <div className="mb20">
                <BaseInfo {...info.special} isHaveContent={vatinvoiceInfo.isExist}
                          isEdit={vatinvoiceInfo.isExist} onOpen={this.onPerfectSpecial}>
                    <VatinvoiceInfoShow {...vatinvoiceInfo}/>
                </BaseInfo>
            </div>
            <div className="mb20">
                <BaseInfo {...info.address} isHaveContent={receiveAddressInfo.isExist}
                          isEdit={receiveAddressInfo.isExist} onOpen={this.onPerfectAddress}>
                    <AddressInfoShow {...receiveAddressInfo} onOpen={this.onPerfectAddress}/>
                </BaseInfo>
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
//普通发票信息展示
class OrdinaryInfoShow extends Component {
    render() {
        const {isExist, ordInvoice} = this.props;
        return (isExist ? (<Descriptions>
            <Descriptions.Item label="发票类型">{ordInvoice.invoiceTypeName}</Descriptions.Item>
            <Descriptions.Item label="发票抬头">{ordInvoice.invoiceTitle}</Descriptions.Item>
            <Descriptions.Item label="发票税号/信用代码">{ordInvoice.invoiceDuty}</Descriptions.Item>
            <Descriptions.Item label="收票方式">{ordInvoice.receiptMethodName}</Descriptions.Item>
        </Descriptions>) : null);
    }
}
//专项发票信息展示
class VatinvoiceInfoShow extends Component {
    //展示图片
    showImg = (url) => {
        return url ? <img src={url} width="50" height="50" alt=""/> : null
    };

    render() {
        const {isExist, vatinvoice} = this.props;
        return (isExist ? (<Descriptions>
            <Descriptions.Item label="公司名称">{vatinvoice.companyName}</Descriptions.Item>
            <Descriptions.Item label="发票税号/信用代码">{vatinvoice.invoiceDuty}</Descriptions.Item>
            <Descriptions.Item label="公司注册地址">{vatinvoice.companyAddress}</Descriptions.Item>
            <Descriptions.Item label="公司电话">{vatinvoice.companyPhone}</Descriptions.Item>
            <Descriptions.Item label="开户银行">{vatinvoice.depositBank}</Descriptions.Item>
            <Descriptions.Item label="银行账号">{vatinvoice.bankCard}</Descriptions.Item>
            <Descriptions.Item label="企业证照">{this.showImg(vatinvoice.companyLicense)}</Descriptions.Item>
        </Descriptions>) : null);
    }
}
//接收地址信息展示
class AddressInfoShow extends Component {
    //展示图片
    showImg = (url) => {
        return url ? <img src={url} width="50" height="50" alt=""/> : null
    };

    render() {
        const {isExist, receiveAddress, onOpen} = this.props;
        return (isExist ? (<Row gutter={32}>
            {receiveAddress && receiveAddress.map((item, index) => {
                return ( <Col span={8} key={index}>
                    <Card size="small" extra={<a onClick={() => onOpen('isEdit', item)}>修改</a>}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="收票方式">{item.receiptMethodName}</Descriptions.Item>
                            <Descriptions.Item label="收票类型">{item.invoiceTypeName}</Descriptions.Item>
                            <Descriptions.Item label="收票人">{item.name}</Descriptions.Item>
                            <Descriptions.Item label="收票人手机号">{item.phone}</Descriptions.Item>
                            <Descriptions.Item label="收票人地址">{item.address}</Descriptions.Item>
                            <Descriptions.Item label="是否默认地址">{item.isDefault === 1 ? '是' : '否'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>);
            })}

        </Row>) : null);
    }
}
