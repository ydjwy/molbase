/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Form, Select, Input, Button, Upload, Icon} from "antd";
import {API_UPLOAD, USER_TOKEN} from '../../../../../contants'
import style from "./index.scss";
const {Option} = Select;
export default class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: {
                proveUrl: [],
                idCardHeadUrl: [],
                idCardNationalUrl: []
            }
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
    }

    componentDidMount() {
        const {data, form: {setFieldsValue}, isEdit} = this.props;
        if (isEdit) {
            const {userName, phone, identity, proveUrl, idCardHeadUrl, idCardNationalUrl} = data.applicant;
            const proveUrlObj = this.showFileFormat(proveUrl);
            const idCardHeadUrlObj = this.showFileFormat(idCardHeadUrl);
            const idCardNationalUrlObj = this.showFileFormat(idCardNationalUrl);
            this.setState({
                files: {
                    proveUrl: (proveUrlObj && proveUrlObj.fileList) || [],
                    idCardHeadUrl: (idCardHeadUrlObj && idCardHeadUrlObj.fileList) || [],
                    idCardNationalUrl: (idCardNationalUrlObj && idCardNationalUrlObj.fileList) || []
                }
            })
            setFieldsValue({
                userName,
                phone,
                identity,
                proveUrl: proveUrlObj,
                idCardHeadUrl: idCardHeadUrlObj,
                idCardNationalUrl: idCardNationalUrlObj
            });
        }
    }

    showFileFormat = (url) => {
        let arr = [];
        const obj = {
            response: {link: url},
            status: "done"
        };
        if (url) {
            arr = [obj]
            return {file: obj, fileList: arr}
        } else {
            return undefined;
        }
    }

    handleChange = ({file, fileList}, type) => {
        const {files} = this.state;
        if (file.status === 'done') {
            this.setState({files: {...files, [type]: fileList}});
        }

    };
    //展示图片
    showImg = (url) => {
        return <img src={url} width="100" height="100" alt=""/>
    };


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const formItemLayout = this.formItemLayout;
        const {files} = this.state;
        const uploadButton = (<div>
            <Button size="small"><Icon type="plus"/>Upload</Button>
        </div>);
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
                    rules: [{required: false, type: 'object', message: '请选上传您的身份证明'}],
                })(<Upload
                    action={API_UPLOAD}
                    headers={{token: USER_TOKEN}}
                    showUploadList={false}
                    onChange={(value) => this.handleChange(value, 'proveUrl')}>
                    {files.proveUrl.length >= 1 ? this.showImg(files.proveUrl[0].response.link) : uploadButton}
                </Upload>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证头像面">
                {getFieldDecorator('idCardHeadUrl', {
                    rules: [{required: false, type: 'object', message: '请选上传身份证头像面'}],
                })(<Upload
                    action={API_UPLOAD}
                    headers={{token: USER_TOKEN}}
                    showUploadList={false}
                    onChange={(value) => this.handleChange(value, 'idCardHeadUrl')}>
                    {files.idCardHeadUrl.length >= 1 ? this.showImg(files.idCardHeadUrl[0].response.link) : uploadButton}
                </Upload>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="身份证国徽面">
                {getFieldDecorator('idCardNationalUrl', {
                    rules: [{required: false, type: 'object', message: '请选上传身份证国徽面'}],
                })(<Upload
                    action={API_UPLOAD}
                    headers={{token: USER_TOKEN}}
                    showUploadList={false}
                    onChange={(value) => this.handleChange(value, 'idCardNationalUrl')}>
                    {files.idCardNationalUrl.length >= 1 ? this.showImg(files.idCardNationalUrl[0].response.link) : uploadButton}
                </Upload>)}
            </Form.Item>
        </div>);
    }
}
