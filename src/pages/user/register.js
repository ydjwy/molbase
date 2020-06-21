/**
 * Created by YD on 2020/6/21.
 */
import React, {PureComponent} from "react";
import {Form, Icon, Input, Button, Modal} from "antd";
import {getRegisterVerify, register} from '../../services/api2'
import "./register.scss";
const FormItem = Form.Item;
class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            registerLoading: false,//登录加载loading
            isGetVerify: true,//是否可以获取验证码
            verifyCount: 0,//验证码计数

        };
    }

    componentDidMount() {
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({registerLoading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values', values)
                const data = {
                    account: values.phone,
                    captcha: values.verify,
                    password: values.password
                }
                register(data).then(res => {
                    this.setState({registerLoading: false});
                    if (res.data === '注册成功') {
                        Modal.success({
                            title: '提示',
                            content: res.data || res.msg,
                            okText: '去登录',
                            onOk: () => {
                                const {history} = this.props;
                                history.push('/user/login')
                            }
                        });
                    } else {
                        Modal.warning({
                            title: '提示',
                            content: res.data || res.msg,
                            okText: '确定',
                            onOk: () => {
                            }
                        });
                    }

                });
            } else {
                this.setState({registerLoading: false});
            }
        });
    };
    handleValidatorPhone = (rule, value, callback) => {
        const reg = /^1[3456789]\d{9}$/;
        if (value && reg.test(value)) {
            callback();
            this.setState({isGetVerify: false});
        } else {
            this.setState({isGetVerify: true});
            callback('请输入正确的手机号')
        }
    };
    //获取验证码
    onGetVerify = () => {
        const {form: {getFieldValue}} = this.props;
        const phone = getFieldValue('phone');
        let count = 60;
        this.setState({verifyCount: count, isGetVerify: true});
        const timer = setInterval(() => {
            if (count > 0) {
                count--;
                this.setState({verifyCount: count})
            } else {
                this.setState({isGetVerify: false});
                clearInterval(timer)
            }
        }, 1000)
        getRegisterVerify({phone, type: "register"});
    };
    //对比第一次输入的密码
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致');
        } else {
            callback();
        }
    };


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {registerLoading, isGetVerify, verifyCount} = this.state;
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="register-form" autoComplete="off">
                    <h1>用户注册</h1>
                    <FormItem>
                        {getFieldDecorator("phone", {
                            validateFirst: true,
                            rules: [{required: true, message: "请输入您的手机号"},
                                {validator: this.handleValidatorPhone}
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                placeholder="请输入您的手机号"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("verify", {
                            rules: [{required: true, message: "请输入验证码"}],
                        })(
                            <Input
                                autoComplete="off"
                                prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                                className='register-verify-box'
                                addonAfter={ <Button type="primary" disabled={isGetVerify} onClick={this.onGetVerify}>
                                    <span>获取验证码{verifyCount ? `(${verifyCount})` : ''}</span>
                                </Button>}
                                placeholder="请输入验证码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "请输入您的密码"}],
                        })(
                            <Input
                                autoComplete="off"
                                prefix={
                                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                                }
                                type="password"
                                placeholder="请输入您的密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("confirmPassword", {
                            rules: [{required: true, message: "请再次输入您的密码"}, {
                                validator: this.compareToFirstPassword,
                            }]
                        })(
                            <Input
                                autoComplete="off"
                                prefix={
                                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                                }
                                type="password"
                                placeholder="请再次输入您的密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={registerLoading}
                            className="register-form-button">
                            {registerLoading ? (<Icon type="loading"/>) : ''}
                            <span>注册</span>
                        </Button>
                    </FormItem>
                </Form>
            </React.Fragment>
        );
    }
}
export default Form.create()(Register);
