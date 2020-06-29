/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Select, Input} from "antd";
import style from "./index.scss";
const {Option} = Select;
class AddressModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressModal: {
                visible: false,
                isEdit: false
            }
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
    }

    componentDidMount() {
        const {addressModal = {}} = this.props;
        this.setState({addressModal});
    }

    //确定操作
    handleOk = () => {
        const {addressModal} = this.state;
        this.setState({addressModal: {...addressModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {addressModal} = this.state;
        this.setState({addressModal: {...addressModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {addressModal: {visible, isEdit}} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.address_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '添加'}发票接收方式`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form  {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="收票方式">
                        {getFieldDecorator('receiptMethod', {
                            rules: [{required: true, message: '请选择收票方式'}],
                        })(<Select placeholder="请选择收票方式">
                            <Option value='1'>纸质发票</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="收票类型">
                        {getFieldDecorator('invoiceType', {
                            rules: [{required: true, message: '请选择收票类型 '}],
                        })(<Select placeholder="请选择收票类型 ">
                            <Option value='1'>普通</Option>
                            <Option value='2'>增值</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="收票人">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入收票人'},],
                        })(<Input placeholder="请输入收票人"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="收票人手机号">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入收票人手机号'},],
                        })(<Input placeholder="请输入收票人手机号"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="收票人地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入收票人地址'},],
                        })(<Input placeholder="请输入收票人地址"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(AddressModal);