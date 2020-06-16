/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal} from "antd";
import style from "./index.scss";
export default class OrdinaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordinaryModal: {
                visible: false,
                isEdit: false
            }
        };
    }

    componentDidMount() {
        const {ordinaryModal = {}} = this.props;
        this.setState({ordinaryModal});
    }

    //确定操作
    handleOk = () => {
        const {ordinaryModal} = this.state;
        this.setState({ordinaryModal: {...ordinaryModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {ordinaryModal} = this.state;
        this.setState({ordinaryModal: {...ordinaryModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {ordinaryModal: {visible, isEdit}} = this.state;
        return (<div id={style.ordinary_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '添加'}增值税普通发票`}
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
