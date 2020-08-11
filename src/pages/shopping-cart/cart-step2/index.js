import React, {Component} from "react";
import {Radio, Table, Button} from 'antd';
import {
    getShippingAddressList,
    modifyDefaultAddress,
    getReceiveAddress,
    getOrdinvoice,
    getVatinvoice,
    confirmOrderInfo
} from '../../../services/api2';
import  ShipAddressModal from '../../account/shipping-address/ship-address-modal';
import AddressModal from '../../account/invoice/address-modal'
import OrdinaryModal from '../../account/invoice/ordinary-modal'
import SpecialModal from '../../account/invoice/special-modal'
import  style from './index.scss'
const shipAddressShowKey = {
    nameKey: "realName",
    phoneKey: "phone",
    addressKey: "detailedAddress",
    defaultValue: 'isDefault',
    idKey: 'id'
};
const invoiceAddressShowKey = {
    nameKey: "name",
    phoneKey: "phone",
    addressKey: "address",
    defaultValue: 'isDefault',
    idKey: 'id'
};
const invoiceInfoShowKey = {
    dataKey: 'ordInvoice',
    nameKey: "invoiceTitle",
    codeKey: "invoiceDuty",
    type: '普通'
};
const vatInvoiceInfoShowKey = {
    dataKey: 'vatinvoice',
    nameKey: "companyName",
    codeKey: "invoiceDuty",
    type: '专项'
};

export default class ShoppingCartStep2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.selectedShipAddress = null;
    }

    //提交订单
    onSubmitOrder = () => {
        const {onSubmit} = this.props;
        onSubmit();
    };
    //选择收货人信息
    onSelectShipAddress = (value) => {
        this.selectedShipAddress = value;
    };


    render() {
        const {onBack, userInfo, goodsId} = this.props;
        return (
            <div className={`${style.shopping_cart_step2_wrapper} clear`}>
                <div className="pl15 pb15 pr15 pt15" style={{border: '1px solid #e8e8e8'}}>
                    <ConsigneeInfo onSelectShipAddress={this.onSelectShipAddress}/>
                    <ShippingMethods/>
                    <InvoiceInfo userInfo={userInfo}/>
                    <ShoppingList onBack={onBack} goodsId={goodsId}/>
                </div>
            </div>
        )
    }
}

class Title extends Component {
    render() {
        const {title} = this.props;
        return (<h3 style={{borderLeft: '3px solid #1890ff'}} className="pl5 mb0">{title}</h3>);
    }
}
//收货人信息
class ConsigneeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipAddressModal: {//收货地址弹框
                visible: false,
                isEdit: false
            },
            shipAddressInfo: {},//收货地址信息
            selectAddressId: '',//选择的收获地址id
        };
    }

    componentWillMount() {
        this.init();
    }

    //初始化，获取收货地址信息
    init = () => {
        const {onSelectShipAddress} = this.props;
        const {selectAddressId} = this.state;
        getShippingAddressList().then(res => {
            if (res.status === 200) {
                if (res.data.isExist) {
                    res.data.uerAddress.forEach(item => {
                        if ((!selectAddressId && item.isDefault === 1) || (!!selectAddressId && selectAddressId === item.id)) {
                            onSelectShipAddress(item);
                            this.setState({shipAddressInfo: res.data, selectAddressId: item.id});
                        }
                    })
                } else {
                    this.setState({shipAddressInfo: res.data});
                }
            }
        });
    };
    //选择收获地址
    onSelectAddress = (info) => {
        const {onSelectShipAddress} = this.props;
        onSelectShipAddress(info.data);
        this.setState({selectAddressId: info.selectAddressId});
    };
    //新增收获地址
    onAdd = () => {
        this.setState({shipAddressModal: {visible: true, isEdit: false}});
    };
    //编辑收获地址
    onEdit = (item) => {
        this.setState({shipAddressModal: {visible: true, isEdit: true, data: item}});
    };
    //设置默认
    onSetDefault = (item) => {
        modifyDefaultAddress(item.id).then(res => {
            if (res.status === 200) {
                this.init();
            }
        })
    };

//关闭收获地址信息弹框
    onShipAddressModal = (isSave) => {
        if (isSave) {
            this.init();
        }
        this.setState({shipAddressModal: {visible: false, isEdit: false}});
    };

    render() {
        const {shipAddressInfo, selectAddressId, shipAddressModal} = this.state;
        return (
            <div>
                <Title title="收货人信息"/>
                <div className="pt20 pl20 pb20 pr20">
                    <ShowAddressInfo info={{list: shipAddressInfo.uerAddress, isExist: shipAddressInfo.isExist}}
                                     onEdit={this.onEdit}
                                     onAdd={this.onAdd}
                                     onSetDefault={this.onSetDefault}
                                     onSelect={this.onSelectAddress}
                                     selected={selectAddressId}
                                     {...shipAddressShowKey}/>
                </div>
                {shipAddressModal.visible ? (
                    <ShipAddressModal shipAddressModal={shipAddressModal} onClose={this.onShipAddressModal}/>) : null}
            </div>
        )
    }
}
//配送方式
class ShippingMethods extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <div>
                <Title title="配送方式"/>
                <div className="pt20 pl20 pb20 pr20">
                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>物流配送</Radio>
                    </Radio.Group>
                    <p className="mt10 fs12">您在大宗购买的商品将通过物流配送的形式送达目的地。</p>
                </div>
            </div>
        )
    }
}
//发票信息
class InvoiceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receiveAddressInfo: {},//发票接收地址信息
            selectAddressId: '',//选择的发票接收地址信息
            addressModal: {//发票接收地址弹框
                visible: false,
                isEdit: false
            },
            selectInvoiceType: 1,//选择的发票类型
            ordinvoiceInfo: {},//普通发票信息
            vatinvoiceInfo: {},//专项发票信息
            ordinaryModal: {//普通发票弹框
                visible: false,
                isEdit: false
            },
            specialModal: {//专项发票弹框
                visible: false,
                isEdit: false
            }
        };
    }

    componentWillMount() {
        const currentUser = localStorage.getItem('currentUser');
        if (!!currentUser) {
            this.initAddress();
            this.initOrdinvoice();
            this.initVatinvoice();
        } else {
            window.location.href = '/#/user/login';
        }
    }

    //初始化地址
    initAddress = () => {
        const {userInfo: {user}} = this.props;
        const {selectAddressId} = this.state;
        getReceiveAddress({uid: user.uid}).then(res => {
            if (res.status === 200) {
                if (res.data.isExist) {
                    res.data.receiveAddress.forEach(item => {
                        if ((!selectAddressId && item.isDefault === 1) || (!!selectAddressId && selectAddressId === item.id)) {
                            this.setState({receiveAddressInfo: res.data, selectAddressId: item.id});
                        }
                    })
                } else {
                    this.setState({receiveAddressInfo: res.data});
                }
            }
        })
    }
    //初始化普通发票
    initOrdinvoice = () => {
        const {userInfo: {user}} = this.props;
        getOrdinvoice({uid: user.uid}).then(res => {
            if (res.status === 200) {
                this.setState({ordinvoiceInfo: res.data})
            }
        })
    };
    //初始化专项发票
    initVatinvoice = () => {
        const {userInfo: {user}} = this.props;
        getVatinvoice({uid: user.uid}).then(res => {
            if (res.status === 200) {
                this.setState({vatinvoiceInfo: res.data})
            }
        })
    };
    //选中发票类型
    onChange = e => {
        this.setState({selectInvoiceType: e.target.value,});
    };
    //新建地址
    onAddAddress = () => {
        const {userInfo: {user}} = this.props;
        this.setState({addressModal: {visible: true, isEdit: false, uid: user.uid}});
    };
    //编辑地址
    onEditAddress = (data) => {
        const {userInfo: {user}} = this.props;
        this.setState({addressModal: {visible: true, isEdit: true, data, uid: user.uid}});
    };
    //设置默认地址
    onSetDefaultAddress = () => {
    };
    //选择发票接收地址
    onSelectAddress = (info) => {
        this.setState({selectAddressId: info.selectAddressId});
    };
    //关闭发票接收信息弹框
    onCloseAddressModal = (isSave) => {
        if (isSave) {
            this.initAddress();
        }
        this.setState({addressModal: {visible: false, isEdit: false}});
    };
    //编辑发票信息
    onEditInvoice = () => {
        const {selectInvoiceType, ordinvoiceInfo, vatinvoiceInfo} = this.state;
        const {userInfo: {user}} = this.props;
        const ordinaryModal = {ordinaryModal: {visible: true, isEdit: true, data: ordinvoiceInfo, uid: user.uid}}
        const specialModal = {specialModal: {visible: true, isEdit: true, data: vatinvoiceInfo, uid: user.uid}}
        selectInvoiceType === 1 ? this.setState({...ordinaryModal}) : this.setState({...specialModal});
    };
    //新建发票信息
    onAddInvoice = () => {
        const {userInfo: {user}} = this.props;
        const {selectInvoiceType} = this.state;
        const ordinaryModal = {ordinaryModal: {visible: true, isEdit: false, uid: user.uid}};
        const specialModal = {specialModal: {visible: true, isEdit: false, uid: user.uid}};
        selectInvoiceType === 1 ? this.setState({...ordinaryModal}) : this.setState({...specialModal});
    };
    //关闭新建编辑发票弹框
    onCloseInvoiceModal = (isSave) => {
        const {selectInvoiceType} = this.state;
        if (isSave) {
            selectInvoiceType === 1 ? this.initOrdinvoice() : this.initVatinvoice();
        }
        const ordinaryModal = {ordinaryModal: {visible: false, isEdit: false}};
        const specialModal = {specialModal: {visible: false, isEdit: false}};
        selectInvoiceType === 1 ? this.setState({...ordinaryModal}) : this.setState({...specialModal});


    };

    render() {
        const {receiveAddressInfo, selectAddressId, addressModal, selectInvoiceType, ordinvoiceInfo, vatinvoiceInfo, ordinaryModal, specialModal} = this.state;
        return (
            <div>
                <Title title="发票信息"/>
                <div className="pt20 pl20 pb20 pr20">
                    <Radio.Group onChange={this.onChange} value={selectInvoiceType}>
                        <Radio value={1}>增值税普通发票</Radio>
                        <Radio value={2}>增值税专项发票</Radio>
                    </Radio.Group>
                    <InvoiceDetail info={selectInvoiceType === 1 ? ordinvoiceInfo : vatinvoiceInfo}
                                   keys={selectInvoiceType === 1 ? invoiceInfoShowKey : vatInvoiceInfoShowKey}
                                   onEdit={this.onEditInvoice}
                                   onAdd={this.onAddInvoice}/>
                </div>
                <Title title="发票接收地址"/>
                <div className="pt20 pl20 pb20 pr20">
                    <ShowAddressInfo
                        info={{list: receiveAddressInfo.receiveAddress, isExist: receiveAddressInfo.isExist}}
                        onEdit={this.onEditAddress}
                        onAdd={this.onAddAddress}
                        onSetDefault={this.onSetDefaultAddress}
                        onSelect={this.onSelectAddress}
                        selected={selectAddressId}
                        {...invoiceAddressShowKey}/>
                    <div>
                    </div>
                </div>
                {ordinaryModal.visible ?
                    <OrdinaryModal ordinaryModal={ordinaryModal} onClose={this.onCloseInvoiceModal}/> : null}
                {specialModal.visible ?
                    <SpecialModal specialModal={specialModal} onClose={this.onCloseInvoiceModal}/> : null}
                {addressModal.visible ?
                    <AddressModal addressModal={addressModal} onClose={this.onCloseAddressModal}/> : null}
            </div>
        )
    }
}
//商品清单
class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {order: {}},//订单商品信息
        };
        this.columns = [
            {title: '产品名称', width: 200, dataIndex: 'name', key: 'name'},
            {title: '品牌|货号', dataIndex: 'name1', key: 'name1'},
            {title: '货期', dataIndex: 'name1', key: 'name2'},
            {title: '规格', dataIndex: 'name1', key: 'nam1'},
            {title: '单价', dataIndex: 'name1', key: 'nam'},
            {title: '数量', dataIndex: 'name1', key: 'nme1'},
            {title: '小计', dataIndex: 'name1', key: 'na1'},
        ];
    }

    componentWillMount() {
        const {goodsId} = this.props;
        confirmOrderInfo({cartId: goodsId}).then(res => {
            if (res.status === 200) {
                this.setState({orderInfo: res.data})
            }
        })
    }

    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const {onBack} = this.props;
        const { orderInfo: {order}}=this.state;
        const columns = this.columns;
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return (
            <div>
                <Title title={<span>商品清单 <small><a onClick={onBack}>返回购物车修改</a></small></span>}/>
                <div className="pt20 pl20 pb20 pr20">
                    <h4>
                        <div className="dib w60">商家名称 标识</div>
                        <div className="dib w40" align="right">服务热线：400-4564-3535（9:00-18:00）</div>
                    </h4>
                    <Table columns={columns} pagination={false} dataSource={data}/>
                </div>
                <div className="pl15 pt15 pb15 pr15 right" align="right" style={{width: 400}}>
                    <p>
                        <span className="dib w60">商品数量：</span>
                        <span className="dib w40">{order.total} 件</span>
                    </p>
                    <p>
                        <span className="dib w60">商品金额：</span>
                        <span className="dib w40">￥{order.totalPic}</span>
                    </p>
                    <p>
                        <span className="dib w60">减免：</span>
                        <span className="dib w40">￥0</span>
                    </p>
                    <p>
                        <span className="dib w60">运费（估）：</span>
                        <span className="dib w40">￥0</span>
                    </p>
                    <p>
                        <span className="dib w60">可获积分：</span>
                        <span className="dib w40">6</span>
                    </p>
                    <p>
                        <span className="dib w60">应付总额：</span>
                        <span className="dib w40">￥{order.totalPic}</span>
                    </p>
                    <Button type="danger" className='w_200' onClick={this.onSubmitOrder}>提交订单</Button>
                </div>
            </div>
        )
    }
}
//地址信息展示
class ShowAddressInfo extends Component {
    onChange = e => {
        const {onSelect} = this.props;
        onSelect({selectAddressId: e.target.value, data: e.target.data});
    };

    render() {
        const {info: {list, isExist}, selected, onEdit, onAdd, onSetDefault, idKey = 'id', defaultValue = 'isDefault', nameKey = "name", phoneKey = "phone", addressKey = "address"} = this.props;
        return (
            <React.Fragment>
                {isExist ? (<Radio.Group onChange={this.onChange} value={selected}>
                    {list && list.map(item => {
                        return ( <p key={item[idKey]} className={style.edit_address_item}>
                            <Radio value={item[idKey]} data={item}/>
                            {`${item[nameKey]}  ${item[phoneKey]}  ${item[addressKey]} `}
                            {item[defaultValue] ? '默认' : <a onClick={() => onSetDefault(item)}>设置默认</a>} &nbsp;
                            <a className={style.edit_address_btn}
                               onClick={() => onEdit(item)}>编辑</a>
                        </p>)
                    })}
                </Radio.Group>) : null}
                <div>
                    <a onClick={() => onAdd()}>+新增地址</a>
                </div>
            </React.Fragment>
        )
    }
}
//发票信息展示
class InvoiceDetail extends Component {
    render() {
        const {info, onEdit, onAdd, keys: {dataKey = 'vatinvoice', nameKey = 'name', codeKey = 'code', type = "普通"}} = this.props;
        return (
            <div>
                {info.isExist ? (<div className={`${style.edit_address_item} mt10 dib`}>
                    <span className="mr10">{info[dataKey][nameKey]}</span>
                    <span className="mr10">{info[dataKey][codeKey]}</span>
                    <a className={style.edit_address_btn} onClick={onEdit}>编辑</a>
                </div>) : (<p className="mt10 fs12">尚未添加增值税{type}发票<a onClick={onAdd}>立即添加</a></p>)}
            </div>
        )
    }
}