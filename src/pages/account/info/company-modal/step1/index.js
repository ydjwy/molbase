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
    }


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.company_modal_step1_wrapper} className="mt20">
            <Form.Item {...formItemLayout} label="您的姓名">
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入您的真实姓名'},],
                })(<Input placeholder="请输入您的真实姓名"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="手机号码">
                {getFieldDecorator('mobile', {
                    rules: [{required: true, message: '请输入您的手机号码'},],
                })(<Input placeholder="固定电话和手机号码必填一项"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="固定电话">
                {getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入您的固定电话'},],
                })(<Input placeholder="固定电话和手机号码必填一项"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="您的身份">
                {getFieldDecorator('qq', {
                    rules: [{required: true, message: '请选择您的身份'}],
                })(<Select placeholder="请选择您的身份">
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                </Select>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="法人代表证明">
                {getFieldDecorator('upload', {
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
                {getFieldDecorator('upload', {
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
                {getFieldDecorator('upload', {
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
