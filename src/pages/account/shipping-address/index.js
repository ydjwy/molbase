/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Row, Col, Card, Descriptions, message, Modal} from "antd";
import PageTitle from '../../../components/account/page-title'
import  ShipAddressModal from './ship-address-modal'
import BaseInfo from '../../../components/account/base-info'
import {getShippingAddressList, deleteShippingAddress} from '../../../services/api2'
import style from "./index.scss";
const {confirm} = Modal;
export default class AccountShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipAddressModal: {//收货地址弹框
                visible: false,
                isEdit: false
            },
            shipAddressInfo: {},//收货地址信息
        };
        this.info = {
            address: {
                title: '收货地址',
                text: '您还没有填写过收货地址',
                textList: [],
                btnText: '立即完善收货地址',
                handleText: '新增地址'
            }
        }
    }

    componentDidMount() {
        this.init();
    }

    //初始化，获取收货地址信息
    init = () => {
        getShippingAddressList().then(res => {
            if (res.status === 200) {
                this.setState({shipAddressInfo: res.data})
            }
        });
    };
    //完善基本信息
    onPerfectShipAddress = (type, item) => {
        const addTypes = ['new', 'edit'];
        if (addTypes.includes(type)) {
            this.setState({shipAddressModal: {visible: true, isEdit: false}});
        } else if (type === 'isEdit') {
            this.setState({shipAddressModal: {visible: true, isEdit: true, data: item}});
        } else if (type === 'isDelete') {
            confirm({
                title: '确定删除',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deleteShippingAddress(item.id).then(res => {
                        if (res.status === 200) {
                            message.success(res.msg);
                            this.init();
                        }
                    })
                },
                onCancel() {
                },
            });
        }
    };
    //关闭收获地址信息弹框
    onShipAddressModal = (isSave) => {
        if (isSave) {
            this.init();
        }
        this.setState({shipAddressModal: {visible: false, isEdit: false}});
    };

    render() {
        const {shipAddressModal, shipAddressInfo} = this.state;
        const info = this.info;
        return (<div id={style.account_shipping_address_wrapper}>
            <div className="mb20">
                <PageTitle title="地址管理"/>
            </div>
            <BaseInfo {...info.address} isHaveContent={shipAddressInfo.isExist} isEdit={shipAddressInfo.isExist}
                      onOpen={this.onPerfectShipAddress}>
                <ShipAddressInfoShow {...shipAddressInfo} onOpen={this.onPerfectShipAddress}/>
            </BaseInfo>
            {shipAddressModal.visible ? (
                <ShipAddressModal shipAddressModal={shipAddressModal} onClose={this.onShipAddressModal}/>) : null}

        </div>);
    }
}

//收货地址信息展示
class ShipAddressInfoShow extends Component {
    //展示图片
    showImg = (url) => {
        return url ? <img src={url} width="50" height="50" alt=""/> : null
    };

    render() {
        const {isExist, uerAddress, onOpen} = this.props;
        return (isExist ? (<Row gutter={32}>
            {uerAddress && uerAddress.map((item, index) => {
                return ( <Col span={8} key={index}>
                    <Card size="small" extra={<span>
                        <a onClick={() => onOpen('isEdit', item)} className="mr10">修改</a>
                        <a onClick={() => onOpen('isDelete', item)}>删除</a>
                    </span>}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="收件人">{item.realName}</Descriptions.Item>
                            <Descriptions.Item label="手机号码">{item.phone}</Descriptions.Item>
                            <Descriptions.Item label="邮编">{item.postCode}</Descriptions.Item>
                            <Descriptions.Item label="收货地址">{item.detailedAddress}</Descriptions.Item>
                            <Descriptions.Item label="是否默认地址">{item.isDefault === 1 ? '是' : '否'}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>);
            })}

        </Row>) : null);
    }
}