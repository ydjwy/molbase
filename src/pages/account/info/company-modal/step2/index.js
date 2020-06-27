/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Form, Select, Input, Cascader, Button, Upload, Icon} from "antd";
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
                this.setState({cityInfo: (res.data && res.data.city && res.data.city.options) || []}, () => {
                    const {data, form: {setFieldsValue}, isEdit} = this.props;
                    if (isEdit) {
                        const {companyName, telephone, address, province, city, area, companyType, enterpriseLicenseUrl} = data.company;
                        const region = [province, city, area];
                        setFieldsValue({companyName, telephone, address, region, companyType, enterpriseLicenseUrl});
                    }
                })
            }
        });
    }


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {cityInfo} = this.state;
        const formItemLayout = this.formItemLayout;
        return (<div id={style.company_modal_step2_wrapper} className="mt20">
            <Form.Item {...formItemLayout} label="公司名称">
                {getFieldDecorator('companyName', {
                    rules: [{required: true, message: '请输入公司名称'},],
                })(<Input placeholder="请输入公司名称"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="联系方式">
                {getFieldDecorator('telephone', {
                    rules: [{required: true, message: '请输入公司的电话或手机号码'},],
                })(<Input placeholder="请输入公司的电话或手机号码"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="所在地区">
                {getFieldDecorator('region', {
                    rules: [{required: true, message: '请选择所在地区'},],
                })(<Cascader options={cityInfo} placeholder="请选择所在地区"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="详细地址">
                {getFieldDecorator('address', {
                    rules: [{required: true, message: '请输入地址'},],
                })(<Input placeholder="请输入地址"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="公司类型">
                {getFieldDecorator('companyType', {
                    rules: [{required: true, message: '请选择公司类型'}],
                })(<Select placeholder="请选择公司类型">
                    <Option value="民企">民企</Option>
                    <Option value="国企">国企</Option>
                    <Option value="外企">外企</Option>
                </Select>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="企业证照">
                {getFieldDecorator('enterpriseLicenseUrl', {
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
