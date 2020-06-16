/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Modal} from "antd";
import style from "./index.scss";
export default class SpecialModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialModal: {
                visible: false,
                isEdit: false
            }
        };
    }

    componentDidMount() {
        const {specialModal = {}} = this.props;
        this.setState({specialModal});
    }

    //确定操作
    handleOk = () => {
        const {specialModal} = this.state;
        this.setState({specialModal: {...specialModal, visible: false}});
    };
    //取消操作
    handleCancel = () => {
        const {specialModal} = this.state;
        this.setState({specialModal: {...specialModal, visible: false}});
    };
    //弹框关闭后回调
    handleAfterClose = () => {
        const {onClose} = this.props;
        onClose();
    };

    render() {
        const {specialModal: {visible, isEdit}} = this.state;
        return (<div id={style.special_modal_wrapper}>
            <Modal
                title={`${isEdit ? '修改' : '添加'}增值税专项发票`}
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
