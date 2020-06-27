/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal, Steps, Button, Form} from "antd";
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import {saveUserApplicantData, updateUserApplicantData} from '../../../../services/api2'
import style from "./index.scss";
const {Step} = Steps;
const steps = [
    {title: '申请人信息'},
    {title: '公司/机构信息',},
    {title: '完成认证信息',},
];
class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyModal: {
                visible: false,
                isEdit: false
            },
            applicant: {},//申请人信息
            company: {},//公司信息
            current: 0,
            isOnOk: false,//判断取消与完成操作，true完成，false取消
        };
    }

    componentDidMount() {
        const {companyModal = {}} = this.props;
        let company = {};
        let applicant = {};
        if (companyModal.isEdit) {
            applicant = companyModal.data.applicant;
            company = companyModal.data.company;
        }
        this.setState({companyModal, company, applicant});
    }

    //确定操作
    handleOk = () => {
        const {companyModal} = this.state;
        this.setState({companyModal: {...companyModal, visible: false}, isOnOk: true});
    };
    //取消操作
    handleCancel = () => {
        const {companyModal} = this.state;
        this.setState({companyModal: {...companyModal, visible: false}, isOnOk: false});
    };

    //下一步
    handleNext = () => {
        const {current, companyModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const applicant = {
                    ...values,
                    uid: companyModal.uid,
                };
                this.setState({current: current + 1, applicant: {...this.state.applicant, ...applicant}});
            }
        });

    };
    //上一步
    handlePrev = () => {
        const {current} = this.state;
        this.setState({current: current - 1});
    };
    //提交
    handleSubmit = () => {
        const {current, companyModal} = this.state;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let api = saveUserApplicantData;
                if (companyModal.isEdit) {
                    api = updateUserApplicantData;
                }
                let company = {
                    ...this.state.company,
                    ...values,
                    uid: companyModal.uid,
                    province: values.region[0],
                    city: values.region[1],
                    area: values.region[2],
                };
                delete company.region;
                this.setState({company}, () => {
                    const {applicant, company} = this.state;
                    api({applicant, company}).then(res => {
                        if (res.status === 200) {
                            this.setState({current: current + 1});
                        }
                    })
                });
            }
        });
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        const {isOnOk} = this.state;
        onClose(isOnOk);
    };
    getFooterBtn = () => {
        const {current} = this.state;
        const footer = (<React.Fragment>
            {current < 2 ? (<Button onClick={this.handleCancel}>取消</Button>) : null}
            {current < 1 ? (<Button type="primary" onClick={this.handleNext}>下一步</Button>) : null}
            {current === 1 ? (<Button type="primary" onClick={this.handlePrev}>上一步</Button>) : null}
            {current === 1 ? (<Button type="primary" onClick={this.handleSubmit}>提交</Button>) : null}
            {current === 2 ? (<Button type="primary" onClick={this.handleOk}>完成</Button>) : null}
        </React.Fragment>);
        return footer;
    };

    render() {
        const {companyModal: {visible, isEdit, data}, current} = this.state;
        return (<div id={style.company_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '完善'}公司信息`}
                visible={visible}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={this.getFooterBtn()}
                afterClose={this.handleAfterClose}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <Form>
                    {current === 0 ? <Step1 form={this.props.form} isEdit={isEdit} data={data}/> : null}
                    {current === 1 ? <Step2 form={this.props.form} isEdit={isEdit} data={data}/> : null}
                    {current === 2 ? <Step3/> : null}
                </Form>
            </Modal>
        </div>);
    }
}
export default Form.create()(CompanyModal);