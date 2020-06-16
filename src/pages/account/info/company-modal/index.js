/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal} from "antd";
import style from "./index.scss";
export default class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyModal: {
                visible: false,
                isEdit: false
            }
        };
    }

    componentDidMount() {
        const {companyModal = {}} = this.props;
        this.setState({companyModal});
    }

    //确定操作
    handleOk = () => {
        const {companyModal} = this.state;
        this.setState({companyModal: {...companyModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {companyModal} = this.state;
        this.setState({companyModal: {...companyModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {companyModal: {visible, isEdit}} = this.state;
        return (<div id={style.company_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '完善'}公司信息`}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.handleAfterClose}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>);
    }
}
