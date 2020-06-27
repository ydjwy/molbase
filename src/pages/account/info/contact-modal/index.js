/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Input} from "antd";
import {updateUserData} from '../../../../services/api2'
import style from "./index.scss";
class ContactModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseModal: {
                visible: false,
                isEdit: false
            },
            cityInfo: []
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
    }

    componentDidMount() {
        const {baseModal = {}, form: {setFieldsValue}} = this.props;
        this.setState({baseModal}, () => {
            setFieldsValue({[baseModal.key]: baseModal.data[baseModal.key]});
        });
    }

    //确定操作
    handleOk = () => {
        const {baseModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    ...baseModal.data,
                    ...values,
                };
                updateUserData(data).then(res => {
                    this.setState({baseModal: {...baseModal, visible: false, isOnOk: true}});
                })
            }
        });
    };
    //取消操作
    handleCancel = () => {
        const {baseModal} = this.state;
        this.setState({baseModal: {...baseModal, visible: false, isOnOk: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        const {baseModal: {isOnOk}} = this.state;
        onClose(isOnOk);
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {baseModal: {visible, key}} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.contact_modal_wrapper}>
            <Modal
                title='修改手机号码'
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form {...formItemLayout}>
                    {key === 'phone' ? (
                        <Form.Item {...formItemLayout} label="手机号码">
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入手机号码'},],
                            })(<Input placeholder="请输入手机号码"/>)}
                        </Form.Item>
                    ) : null}
                    {key === 'mailbox' ? (
                        <Form.Item {...formItemLayout} label="电子邮箱">
                            {getFieldDecorator('mailbox', {
                                rules: [{required: true, message: '请输入电子邮箱'},],
                            })(<Input placeholder="请输入电子邮箱"/>)}
                        </Form.Item>
                    ) : null}
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(ContactModal);