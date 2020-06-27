/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Form, Select, Input, Button, Upload, Icon} from "antd";
import style from "./index.scss";
const {Option} = Select;
export default class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
    }

    componentDidMount() {
        const {data, form: {setFieldsValue}, isEdit} = this.props;
        if (isEdit) {
            const {userName, phone, identity, proveUrl, idCardHeadUrl, idCardNationalUrl} = data.applicant;
            setFieldsValue({userName, phone, identity, proveUrl, idCardHeadUrl, idCardNationalUrl});
        }
    }


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.company_modal_step1_wrapper} className="mt20">
            <Form.Item {...formItemLayout} label="您的姓名">
                {getFieldDecorator('userName', {
                    rules: [{required: true, message: '请输入您的真实姓名'},],
                })(<Input placeholder="请输入您的真实姓名"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="联系方式">
                {getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入您的电话或手机号码'},],
                })(<Input placeholder="请输入您的电话或手机号码"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="您的身份">
                {getFieldDecorator('identity', {
                    rules: [{required: true, message: '请选择您的身份'}],
                })(<Select placeholder="请选择您的身份">
                    <Option value='1'>机构法人代表</Option>
                    <Option value='2'>机构委托人</Option>
                </Select>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证明">
                {getFieldDecorator('proveUrl', {
                    valuePropName: 'fileList',
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload"/>上传
                        </Button>
                    </Upload>,
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证头像面">
                {getFieldDecorator('idCardHeadUrl', {
                    valuePropName: 'fileList',
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload"/>上传
                        </Button>
                    </Upload>,
                )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证国徽面">
                {getFieldDecorator('idCardNationalUrl', {
                    valuePropName: 'fileList',
                })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload"/>上传
                        </Button>
                    </Upload>,
                )}
            </Form.Item>
        </div>);
    }
}
