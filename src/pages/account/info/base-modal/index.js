/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Select, Input, DatePicker, Cascader, Radio} from "antd";
import moment from "moment";
import {getCitys, saveUserData, updateUserData} from '../../../../services/api2'
import style from "./index.scss";
const df = 'YYYY-MM-DD';
class BaseModal extends Component {
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
        getCitys().then(res => {
            if (res.status === 200) {
                this.setState({cityInfo: (res.data && res.data.city && res.data.city.options) || []}, () => {
                    if (baseModal.isEdit) {
                        const {address, area, city, gender, mailbox, phone, province, userName, year} = baseModal.data.userData;
                        const data = {
                            region: [province, city, area],
                            address,
                            gender,
                            mailbox,
                            phone,
                            userName,
                            year: moment(year)
                        };
                        setFieldsValue(data);
                    }
                })
            }
        });
        this.setState({baseModal});
    }

    //确定操作
    handleOk = () => {
        const {baseModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    uid: baseModal.uid,
                    province: values.region[0],
                    city: values.region[1],
                    area: values.region[2],
                    year: moment(values.year).format(df)
                };
                delete data.region;
                let api = saveUserData;
                if (baseModal.isEdit) {
                    data = {...baseModal.data.userData, ...data};
                    api = updateUserData
                }
                api(data).then(res => {
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
        const {baseModal: {visible, isEdit}, cityInfo} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.base_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '完善'}基本信息`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="昵称">
                        {getFieldDecorator('userName', {
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
                        {getFieldDecorator('year', {
                            rules: [{type: 'object', required: true, message: '请选择生日!'}],
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="所在地区">
                        {getFieldDecorator('region', {
                            rules: [{required: true, message: '请选择所在地区'},],
                        })(<Cascader options={cityInfo} placeholder="请选择所在地区"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="地址">
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: '请输入地址'},],
                        })(<Input placeholder="请输入地址"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="手机号码">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号码'},],
                        })(<Input placeholder="请输入手机号码"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="电子邮箱">
                        {getFieldDecorator('mailbox', {
                            rules: [{required: true, message: '请输入电子邮箱'},],
                        })(<Input placeholder="请输入电子邮箱"/>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(BaseModal);