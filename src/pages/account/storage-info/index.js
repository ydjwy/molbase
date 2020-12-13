/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Radio, Select, Input, Button, Table, Menu, Dropdown, Icon, Form, DatePicker, Row, Col} from 'antd';
import moment from 'moment'
import PageTitle from '../../../components/account/page-title'
import AttachmentModal from './AttachmentModal'
import {getWarehouseList, createAccessory} from '../../../services/api2'
import style from "./index.scss";
const {Option} = Select;
const {RangePicker} = DatePicker;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

@connect(({user}) => ({...user}), {...userModel.actions})
export default class StorageInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageInfo: [],
            isOpen: false,//是否收起
            isShowAttachment: false,//操作弹框
            attachmentData: {}
        };
        this.condition = {
            page: 1,
            limit: 1,
            status: "1"
        };


    }

    componentDidMount() {
        const condition = this.condition;
        getWarehouseList(condition).then(res => {
            if (res.status === 200) {
                this.setState({storageInfo: res.data || {}});
            }
        })
    }

    getShowTable = () => {
        const status = {'1': '入库', '2': '货权交割', '3': '安排货转', '4': '出库'};
        const menu = (record) => (
            <Menu onClick={item => this.onHandleMore(item, record)}>
                {record.isPurchase && <Menu.Item key='3'>买入</Menu.Item>}
                {record.isExtract && <Menu.Item key='2'>提取</Menu.Item>}
                <Menu.Item key='1'>查看附件</Menu.Item>
            </Menu>
        );
        const {storageInfo} = this.state;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderNumber',
            }, {
                title: '货权转让方',
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
                    <a type='link' onClick={() => this.createFiles(record)}>生成</a> | <Dropdown overlay={menu(record)}>
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
                pageSize: 10
            }
        }

        return (<Table {...tableData}/>);
    };
    onHandleMore = (item, record) => {
        item.key === '1' && this.setState({isShowAttachment: true, attachmentData: record});
    }
    createFiles = (record) => {
        const {id, orderNumber, uid} = record;
        const params = {id, orderNumber, uid}
        createAccessory(params).then();
    }
    handleAfterClose = () => {
        this.setState({isShowAttachment: false})
    }

    render() {
        const {isOpen, isShowAttachment, attachmentData} = this.state;
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
                                <Radio.Group defaultValue="a" buttonStyle="solid">
                                    <Radio.Button value="0">全部(10)</Radio.Button>
                                    <Radio.Button value="1">买入(10)</Radio.Button>
                                    <Radio.Button value="2">卖出(10)</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="货物名称" {...formItemLayout}>
                                <Input placeholder="请输入货物名称"/>
                            </Form.Item>
                        </Col>
                        {isOpen ? (<React.Fragment>
                            <Col span={8}>
                                <Form.Item label="订单号" {...formItemLayout}>
                                    <Input placeholder="请输入订单号"/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="货权转让方" {...formItemLayout}>
                                    <Input placeholder="请输入货权转让方"/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="货权出让方" {...formItemLayout}>
                                    <Input placeholder="请输入货权出让方"/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="状态"  {...formItemLayout}>
                                    <Select placeholder="请选择状态">
                                        <Option value="1">入库</Option>
                                        <Option value="2">货权交割</Option>
                                        <Option value="3">安排货转</Option>
                                        <Option value="4">出库</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库时间" {...formItemLayout}>
                                    <RangePicker/>
                                </Form.Item>
                            </Col>
                        </React.Fragment>) : null}

                        <Col span={8}>
                            <Form.Item>
                                <Button type="primary" className='ml10 mr10'>查询</Button>
                                <Button className='mr10'>重置</Button>
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
        </div>);
    }
}