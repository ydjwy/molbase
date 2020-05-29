import React, {Component} from "react";
import {Card, Divider, Button, Form, Input} from "antd";
import  style from './index.scss'


class DPFWCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={style.dpfw_wrapper}>
                <Card>
                    <Divider style={{marginTop: 210}}>店铺咨询</Divider>
                    <Form onSubmit={this.handleSubmit} style={{padding: '0 20px'}}>
                        <Form.Item>
                            {getFieldDecorator('companyName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input placeholder="请输入公司名称"/>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input placeholder='请输入手机号码'/>,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className='w100'>提交</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(DPFWCard);