/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Select, Input} from "antd";
import style from "./index.scss";
const {Option} = Select;
class OrdinaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordinaryModal: {
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
        const {ordinaryModal = {}} = this.props;
        this.setState({ordinaryModal});
    }

    //确定操作
    handleOk = () => {
        const {ordinaryModal} = this.state;
        this.setState({ordinaryModal: {...ordinaryModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {ordinaryModal} = this.state;
        this.setState({ordinaryModal: {...ordinaryModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {ordinaryModal: {visible, isEdit}} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.ordinary_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '添加'}增值税普通发票`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form  {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="发票类型">
                        {getFieldDecorator('invoiceType', {
                            rules: [{required: true, message: '请选择发票类型'}],
                        })(<Select placeholder="请选择发票类型">
                            <Option value='1'>增值税普通发票</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="发票抬头">
                        {getFieldDecorator('invoiceTitle', {
                            rules: [{required: true, message: '请输入发票抬头'},],
                        })(<Input placeholder="请输入发票抬头"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="发票税号/信用代码">
                        {getFieldDecorator('invoiceDuty', {
                            rules: [{required: true, message: '请输入发票税号/信用代码'},],
                        })(<Input placeholder="请输入发票税号/信用代码"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="收票方式">
                        {getFieldDecorator('receiptMethod', {
                            rules: [{required: true, message: '请选择收票方式'}],
                        })(<Select placeholder="请选择收票方式">
                            <Option value='1'>纸质发票</Option>
                        </Select>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(OrdinaryModal);