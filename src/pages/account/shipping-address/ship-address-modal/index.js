/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Input, Cascader, Checkbox} from "antd";
import {getCitys, shippingAddressSaveOrUpdate} from '../../../../services/api2'
import style from "./index.scss";
class ShipAddressModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipAddressModal: {
                visible: false,
                isEdit: false
            },
            cityInfo: [],
            isOnOk: false,//判断取消与保存操作，true保存，false取消
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
    }

    componentDidMount() {

        const {shipAddressModal = {}, form: {setFieldsValue}} = this.props;
        getCitys().then(res => {
            if (res.status === 200) {
                this.setState({cityInfo: (res.data && res.data.city && res.data.city.options) || []}, () => {
                    if (shipAddressModal.isEdit) {
                        const {detail, district, city, postCode, isDefault, phone, province, realName} = shipAddressModal.data;
                        const data = {
                            region: [province, city, district],
                            detail,
                            phone,
                            postCode,
                            realName,
                            isDefault: isDefault === 1 ? (true) : (false)
                        };
                        setFieldsValue(data);
                    }
                })
            }
        });
        this.setState({shipAddressModal});
    }

    //确定操作
    handleOk = () => {
        const {shipAddressModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {
                    ...values,
                    province: values.region[0],
                    city: values.region[1],
                    district: values.region[2],
                    isDefault: values.isDefault ? 1 : 0
                };
                delete data.region;
                const api = shippingAddressSaveOrUpdate;
                if (shipAddressModal.isEdit) {
                    data = {...shipAddressModal.data, ...data};
                }
                api(data).then(res => {
                    this.setState({shipAddressModal: {...shipAddressModal, visible: false, isOnOk: true}});
                })
            }
        });
    };
    //取消操作
    handleCancel = () => {
        const {shipAddressModal} = this.state;
        this.setState({shipAddressModal: {...shipAddressModal, visible: false, isOnOk: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        const {shipAddressModal: {isOnOk}} = this.state;
        onClose(isOnOk);
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {shipAddressModal: {visible, isEdit}, cityInfo} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.ship_address_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '完善'}基本信息`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="收件人">
                        {getFieldDecorator('realName', {
                            rules: [{required: true, message: '请输入收件人'},],
                        })(<Input placeholder="请输入收件人"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="手机号码">
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号码'},],
                        })(<Input placeholder="请输入手机号码"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="邮编">
                        {getFieldDecorator('postCode', {
                            rules: [{required: true, message: '请输入邮编'},],
                        })(<Input placeholder="请输入邮编"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="所在地区">
                        {getFieldDecorator('region', {
                            rules: [{required: true, message: '请选择所在地区'},],
                        })(<Cascader options={cityInfo} placeholder="请选择所在地区"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="详细地址">
                        {getFieldDecorator('detail', {
                            rules: [{required: true, message: '请输入详细地址'},],
                        })(<Input placeholder="请输入详细地址"/>)}
                    </Form.Item>
                    <Form.Item  {...formItemLayout} label=" " colon={false}>
                        {getFieldDecorator('isDefault', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(<Checkbox>默认</Checkbox>)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(ShipAddressModal);