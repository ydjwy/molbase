/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Radio, Select, Input, Button, Table, Menu, Dropdown, Icon, Form, DatePicker, Row, Col, Modal} from 'antd';
import moment from 'moment'
import PageTitle from '../../../components/account/page-title'
import AttachmentModal from './AttachmentModal'
import {
    getWarehouseList,
    // createAccessory,
    purchase,
    extract,
    confirmationSell,
    cancelPurchase
} from '../../../services/api2'
import style from "./index.scss";
const {Option} = Select;
const {RangePicker} = DatePicker;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

@connect(({user}) => ({...user}), {...userModel.actions})
class StorageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageInfo: [],
            isOpen: false,//是否收起
            isShowAttachment: false,//操作弹框
            attachmentData: {},
            sellModal: {
                visible: false,
            }
        };
        this.condition = {
            page: 1,
            size: 10,
            flag: "1"
        };


    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        const condition = this.condition;
        let filterCondition = {};
        Object.keys(condition).forEach(key => {
            if (!!condition[key]) {
                filterCondition[key] = condition[key];
            }
        });

        getWarehouseList(filterCondition).then(res => {
            if (res.status === 200) {
                this.setState({storageInfo: res.data || {}});
            }
        })
    };
    getShowTable = () => {
        const status = {'1': '入库', '2': '货权交割', '3': '安排货转', '4': '出库'};
        const menu = (record) => (
            <Menu onClick={item => this.onHandleMore(item, record)}>
                {record.isSell && <Menu.Item key='4'>确认出售</Menu.Item>}
                {record.isPurchase && <Menu.Item key='3'>买入</Menu.Item>}
                {record.isExtract && <Menu.Item key='2'>提取</Menu.Item>}
                {record.isArrange && <Menu.Item key='1'>查看附件</Menu.Item>}
            </Menu>
        );
        const {storageInfo} = this.state;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderNumber',
            }, {
                title: '货权受让方',
                width: 150,
                dataIndex: 'cargoInName',
            }, {
                title: '货物名称',
                dataIndex: 'cargoName',
            }, {
                title: '货物数量',
                width: 100,
                dataIndex: 'quantity',
            }, {
                title: '货权出让方',
                width: 150,
                dataIndex: 'cargoOutName',
            }, {
                title: '状态',
                dataIndex: 'status',
                render: text => status[text]
            }, {
                title: '入库时间',
                dataIndex: 'storageTime',
                render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
            }, {
                title: '操作',
                render: (record) => <div>
                    {/*<a type='link' onClick={() => this.createFiles(record)}>生成</a> | */}
                    <Dropdown overlay={menu(record)}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            更多<Icon type="down"/>
                        </a>
                    </Dropdown>
                </div>,
            },

        ];
        const tableData = {
            columns,
            rowKey: 'id',
            dataSource: storageInfo.warehouseWarrant || [],
            pagination: {
                total: storageInfo.total || 0,
                pageSize: this.condition.size,
                onChange: (page) => {
                    this.condition.page = page;
                    this.init();
                }
            }
        }

        return (<Table {...tableData}/>);
    };
    onHandleMore = (item, record) => {
        let params = {orderNumber: record.orderNumber};
        if (item.key === '1') {
            this.setState({isShowAttachment: true, attachmentData: record});
        } else if (item.key === '2') {
            // this.setState({sellModal: {visible: true, record}})
            this.onMoreMake(extract, params);
        } else if (item.key === '3') {
            params.sellUid = record.uid;
            this.onMoreMake(purchase, params);
        } else if (item.key === '4') {
            this.setState({sellModal: {visible: true, record}})
        }
    }
    // createFiles = (record) => {
    //     const {id, orderNumber, uid} = record;
    //     const params = {id, orderNumber, uid}
    //     createAccessory(params).then();
    // }
    handleAfterClose = () => {
        this.setState({isShowAttachment: false})
    }
    onMoreMake = (api, params) => {
        api(params).then(res => {
            if (res.status === 200) {
                this.init();
            }
            this.setState({sellModal: {visible: false}});
        })
    }

    footerButton = () => {
        const {sellModal: {record}} = this.state;
        if (!!record) {
            let params = {orderNumber: record.orderNumber};
            return (<React.Fragment>
                <Button onClick={() => this.onMoreMake(cancelPurchase, params)}>取消出售</Button>
                <Button type='primary' onClick={() => this.onMoreMake(confirmationSell, params)}>确认出售</Button>
            </React.Fragment>);
        } else {
            return false;
        }
    };

    onRadioChange = (e) => {
        if (e.target) {
            this.condition.flag = e.target.value;
            this.init();
        }
    };
    onSearch = () => {
        const {form: {validateFields}} = this.props;
        validateFields((err, values) => {
            if (!err) {
                if (!!values.storageTime && values.storageTime.length > 0) {
                    this.condition.starStorageTime = moment(values.storageTime[0]).format('YYYY-MM-DD');
                    this.condition.endStorageTime = moment(values.storageTime[1]).format('YYYY-MM-DD');
                }
                this.condition = {...this.condition, ...values};
                delete this.condition.storageTime;
                this.init();
            }
        })
    };
    onReset = () => {
        const {form: {resetFields}} = this.props;
        const {page, size, flag} = this.condition;
        resetFields();
        this.condition = {page, size, flag};
        this.init();

    }

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {isOpen, isShowAttachment, attachmentData, sellModal: {visible, record}} = this.state;
        const showTable = this.getShowTable();
        return (<div id={style.storage_info_wrapper}>
            <div className="mb20">
                <PageTitle title="仓储信息"/>
            </div>
            <div className="clear mb20">
                <Form>
                    <Row>
                        <Col span={8}>
                            <Form.Item>
                                <Radio.Group defaultValue='1' onChange={this.onRadioChange} buttonStyle="solid">
                                    <Radio.Button value="1">全部</Radio.Button>
                                    <Radio.Button value="2">购买</Radio.Button>
                                    <Radio.Button value="3">售出</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="订单号" {...formItemLayout}>
                                {getFieldDecorator('orderNumber', {
                                    rules: [{required: false, message: '请输入订单号'},],
                                })(<Input placeholder="请输入订单号"/>)}
                            </Form.Item>
                        </Col>
                        {isOpen ? (<React.Fragment>
                            <Col span={8}>
                                <Form.Item label="货物名称" {...formItemLayout}>
                                    {getFieldDecorator('cargoName', {
                                        rules: [{required: false, message: '请输入货物名称'},],
                                    })(<Input placeholder="请输入货物名称"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="货权转让方" {...formItemLayout}>
                                    {getFieldDecorator('demanderName', {
                                        rules: [{required: false, message: '请输入货权转让方'},],
                                    })(<Input placeholder="请输入货权转让方"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="货权出让方" {...formItemLayout}>
                                    {getFieldDecorator('supplierName', {
                                        rules: [{required: false, message: '请输入货权出让方'},],
                                    })(<Input placeholder="请输入货权出让方"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="状态"  {...formItemLayout}>
                                    {getFieldDecorator('status', {
                                        rules: [{required: false, message: '请选择状态'},],
                                    })(<Select placeholder="请选择状态">
                                        <Option value="1">入库</Option>
                                        <Option value="2">货权交割</Option>
                                        <Option value="3">安排货转</Option>
                                        <Option value="4">出库</Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库时间" {...formItemLayout}>
                                    {getFieldDecorator('storageTime', {
                                        rules: [{required: false, message: '请选择入库时间'},],
                                    })(<RangePicker/>)}

                                </Form.Item>
                            </Col>
                        </React.Fragment>) : null}
                        <Col span={8}>
                            <Form.Item>
                                <Button type="primary" className='ml10 mr10' onClick={this.onSearch}>查询</Button>
                                <Button className='mr10' onClick={this.onReset}>重置</Button>
                                <a onClick={() => this.setState({isOpen: !isOpen})}>
                                    {isOpen ? '收起 ' : '展开 '}
                                    <Icon type={isOpen ? 'up' : 'down'}/>
                                </a>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            {showTable}
            {isShowAttachment ? <AttachmentModal data={attachmentData} afterClose={this.handleAfterClose}/> : null}
            <Modal
                title="确认出售"
                visible={visible}
                footer={this.footerButton()}
                onCancel={() => this.setState({sellModal: {visible: false}})}>
                {visible && <p>{`确认出售给 【${record.cargoOutName}】 商品： ${record.cargoName} 数量：${record.quantity}`}</p>}
            </Modal>
        </div>);
    }
}
export default Form.create()(StorageInfo);