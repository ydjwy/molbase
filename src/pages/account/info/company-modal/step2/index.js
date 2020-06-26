/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Form, Select, Input, DatePicker, Cascader} from "antd";
import {getCitys} from '../../../../../services/api2'
import style from "./index.scss";
const {Option} = Select;
export default class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityInfo: [],//地区信息
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
    }

    componentDidMount() {
        getCitys().then(res => {
            if (res.status === 200) {
                this.setState({cityInfo: (res.data && res.data.city && res.data.city.options) || []})
            }
        });
    }


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {cityInfo} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.company_modal_step2_wrapper} className="mt20">
            <Form.Item {...formItemLayout} label="公司名称">
                {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入公司名称'},],
                })(<Input placeholder="请输入公司名称"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="固定电话">
                {getFieldDecorator('phone', {
                    rules: [{required: true, message: '请输入您的固定电话'},],
                })(<Input placeholder="固定电话和移动电话必填一项"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="移动电话">
                {getFieldDecorator('mobile', {
                    rules: [{required: true, message: '请输入移动电话'},],
                })(<Input placeholder="固定电话和移动电话必填一项"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="所在地区">
                {getFieldDecorator('area', {
                    rules: [{required: true, message: '请选择所在地区'},],
                })(<Cascader options={cityInfo} placeholder="请选择所在地区"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="详细地址">
                {getFieldDecorator('address', {
                    rules: [{required: true, message: '请输入地址'},],
                })(<Input placeholder="请输入地址"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="公司类型">
                {getFieldDecorator('qq', {
                    rules: [{required: true, message: '请选择公司类型'}],
                })(<Select placeholder="请选择公司类型">
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                </Select>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="企业证照">
                {getFieldDecorator('qq', {
                    rules: [{required: true, message: '请选择公司类型'}],
                })(<Select placeholder="请选择公司类型">
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                </Select>)}
            </Form.Item>
        </div>);
    }
}
