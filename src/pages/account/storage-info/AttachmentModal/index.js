/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import  {Modal, Form, Select} from 'antd'
import userModel from "store/reducers/user";
import {queryAccessory} from '../../../../services/api2'
import style from "./index.scss";
const Option = Select.Option;

@connect(({user}) => ({...user}), {...userModel.actions})
export default class AttachmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInfo: {
                visible: true
            },
            fileTypes: [],//附件信息列表
            fileUrl: '',//附件路径
        };

    }

    componentDidMount() {
        const {data: {orderNumber}} = this.props;
        queryAccessory({orderNumber}).then(res => {
            if (res.status === 200 && res.data.materialsStatus) {
                const fileTypes = [];
                const {warrantUrl, warrantEnabled, upstreamUrl, upstreamEnabled, downstreamUrl, downstreamEnabled, dekuUrl, dekuEnabled} = res.data.materialsStatus;
                if (warrantUrl && warrantEnabled) {
                    fileTypes.push({url: warrantUrl, title: '入库'});
                }
                if (upstreamUrl && upstreamEnabled) {
                    fileTypes.push({url: upstreamUrl, title: '上游合同'});
                }
                if (downstreamUrl && downstreamEnabled) {
                    fileTypes.push({url: downstreamUrl, title: '下游合同'});
                }
                if (dekuUrl && dekuEnabled) {
                    fileTypes.push({url: dekuUrl, title: '出库'});
                }
                this.setState({fileTypes});
            }
        })
    }

    handleOk = () => {
        this.setState({modalInfo: {visible: false}});
    };

    handleCancel = () => {
        this.setState({modalInfo: {visible: false}});
    };
    handleSelectChange = (url) => {
        this.setState({fileUrl: url})
    };

    render() {
        const {modalInfo: {visible}, fileTypes, fileUrl} = this.state;
        const {afterClose} = this.props;
        return (
            <Modal
                width={800}
                title="查看附件"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={false}
                afterClose={afterClose}>
                <div id={style.attachment_modal_wrapper}>
                    <Form labelCol={{span: 3}} wrapperCol={{span:9}}>
                        <Form.Item label="附件类型">
                            <Select placeholder="请选择附件类型" onChange={this.handleSelectChange}>
                                {fileTypes.map((item, index) => <Option key={index}
                                                                        value={item.url}>{item.title}</Option>)}
                            </Select>,
                        </Form.Item>
                    </Form>
                    {fileUrl && <iframe width="100%" height="500" title="附件" src={fileUrl} frameBorder="0"/>}
                </div>
            </Modal>);
    }
}