/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Select, Input, DatePicker, Cascader, Radio} from "antd";
import style from "./index.scss";
class BaseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseModal: {
                visible: false,
                isEdit: false
            }
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        this.options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                            {
                                value: 'xihu',
                                label: 'West Lake',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                            {
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            },
                        ],
                    },
                ],
            },
        ];
    }

    componentDidMount() {
        const {baseModal = {}} = this.props;
        this.setState({baseModal});
    }

    //确定操作
    handleOk = () => {
        const {baseModal} = this.state;
        this.setState({baseModal: {...baseModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {baseModal} = this.state;
        this.setState({baseModal: {...baseModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {baseModal: {visible, isEdit}} = this.state;
        const formItemLayout = this.formItemLayout;
        const options = this.options;
        return (<div id={style.base_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '完善'}基本信息`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="昵称">
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: '请输入昵称'},],
                        })(<Input placeholder="请输入昵称"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="性别">
                        {getFieldDecorator('gender', {
                            rules: [{required: true, message: '请选择性别'}],
                        })(
                            <Radio.Group>
                                <Radio value="1">男</Radio>
                                <Radio value="0">女</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="生日">
                        {getFieldDecorator('birthday', {
                            rules: [{type: 'object', required: true, message: '请选择生日!'}],
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="QQ号">
                        {getFieldDecorator('qq', {
                            rules: [{required: true, message: '请输入QQ号'},],
                        })(<Input placeholder="请输入QQ号"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="所在地区">
                        {getFieldDecorator('area', {
                            rules: [{required: true, message: '请选择所在地区'},],
                        })(<Cascader options={options} placeholder="请选择所在地区"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入地址'},],
                        })(<Input placeholder="请输入地址"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(BaseModal);