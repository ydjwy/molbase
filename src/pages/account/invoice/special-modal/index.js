/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Form, Select, Input, Button, Upload, Icon} from "antd";
import {API_UPLOAD, USER_TOKEN} from '../../../../contants'
import {saveVatinvoice, updateVatinvoice} from '../../../../services/api2'
import style from "./index.scss";
const {Option} = Select;
class SpecialModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialModal: {
                visible: false,
                isEdit: false
            },
            files: {
                companyLicense: [],
            },
            isOnOK: false,//判断保存更新还是取消
        };
        this.formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
    }

    componentDidMount() {
        const {specialModal = {}, form: {setFieldsValue}} = this.props;
        if (specialModal.isEdit) {
            const {companyName, invoiceDuty, companyAddress, companyPhone, depositBank, bankCard, companyLicense, receiptMethod} = specialModal.data.vatinvoice;
            const companyLicenseObj = this.showFileFormat(companyLicense);
            this.setState({
                files: {
                    companyLicense: (companyLicenseObj && companyLicenseObj.fileList) || [],
                }
            })
            const data = {
                companyName,
                invoiceDuty,
                companyAddress,
                companyPhone,
                depositBank,
                bankCard,
                companyLicense: companyLicenseObj,
                receiptMethod
            };
            setFieldsValue(data);
        }
        this.setState({specialModal});
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
    //确定操作
    handleOk = () => {
        const {specialModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = {};
                let api = saveVatinvoice
                if (specialModal.isEdit) {
                    api = updateVatinvoice;
                    data = {...specialModal.data.vatinvoice}
                }
                data = {
                    ...data,
                    ...values,
                    uid: specialModal.uid,
                    companyLicense: this.fileFormat(values.companyLicense),
                }
                api(data).then(res => {
                    if (res.status === 200) {
                        this.setState({specialModal: {...specialModal, visible: false}, isOnOK: true});
                    }
                })
            }
        });

    };
    //处理上传的文件
    fileFormat = (files) => {
        let url = null;
        if (files && files.fileList[0]) {
            url = files.fileList[0].response.link
        }
        return url;
    }
    //取消操作
    handleCancel = () => {
        const {specialModal} = this.state;
        this.setState({specialModal: {...specialModal, visible: false}, isOnOK: false});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        const {isOnOK} = this.state;
        onClose(isOnOK);
    };
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
        const {specialModal: {visible, isEdit}, files} = this.state;
        const formItemLayout = this.formItemLayout;
        const uploadButton = (<div>
            <Button size="small"><Icon type="plus"/>Upload</Button>
        </div>);
        return (<div id={style.special_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '添加'}增值税专项发票`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <Form  {...formItemLayout}>
                    <Form.Item {...formItemLayout} label="公司名称">
                        {getFieldDecorator('companyName', {
                            rules: [{required: true, message: '请输入公司名称'},],
                        })(<Input placeholder="请输入公司名称"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="发票税号/信用代码">
                        {getFieldDecorator('invoiceDuty', {
                            rules: [{required: true, message: '请输入发票税号/信用代码'},],
                        })(<Input placeholder="请输入发票税号/信用代码"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="公司注册地址">
                        {getFieldDecorator('companyAddress', {
                            rules: [{required: true, message: '请输入公司注册地址'},],
                        })(<Input placeholder="请输入公司注册地址"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="公司电话">
                        {getFieldDecorator('companyPhone', {
                            rules: [{required: true, message: '请输入公司电话'},],
                        })(<Input placeholder="请输入公司电话"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="开户银行">
                        {getFieldDecorator('depositBank', {
                            rules: [{required: true, message: '请输入开户银行'},],
                        })(<Input placeholder="请输入开户银行"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="银行账号">
                        {getFieldDecorator('bankCard', {
                            rules: [{required: true, message: '请输入银行账号'},],
                        })(<Input placeholder="请输入银行账号"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="企业证照">
                        {getFieldDecorator('companyLicense', {
                            rules: [{required: false, type: 'object', message: '请选上传企业证照'}],
                        })(<Upload
                            action={API_UPLOAD}
                            headers={{token: USER_TOKEN}}
                            showUploadList={false}
                            onChange={(value) => this.handleChange(value, 'companyLicense')}>
                            {files.companyLicense.length >= 1 ? this.showImg(files.companyLicense[0].response.link) : uploadButton}
                        </Upload>)}
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
export default Form.create()(SpecialModal);