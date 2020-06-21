import React, {PureComponent} from "react";
import {Form, Icon, Input, Button, Checkbox} from "antd";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {getCookie} from "../../utils/cookie";
// import {showPageTitle} from '../../utils/util'
import {login} from '../../services/api2'
import "./login.scss";
const FormItem = Form.Item;
@connect(({user}) => ({...user}), {...userModel.actions})
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loginLoading: false,//登录加载loading
        };

    }

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            userName: getCookie('userName'),
        });
        // showPageTitle(this.props.history.location.pathname);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({loginLoading: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                localStorage.removeItem('currentUser');
                login(values).then(res => {
                    localStorage.setItem('currentUser', JSON.stringify(res.data));
                    const {history} = this.props;
                    history.push('/partial');
                    this.setState({loginLoading: false});
                });
            } else {
                this.setState({loginLoading: false});
            }
        });
    };


    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {loginLoading} = this.state;

        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="login-form" autoComplete="off">
                    <h1>用户登录</h1>
                    <FormItem>
                        {getFieldDecorator("username", {
                            rules: [{required: true, message: "请输入您的账号"}],
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                                }
                                placeholder="请输入您的账号"
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
                        {/*{getFieldDecorator("autoLogin", {*/}
                        {/*valuePropName: "checked",*/}
                        {/*initialValue: true*/}
                        {/*})(<Checkbox>自动登录</Checkbox>)}*/}
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={loginLoading}
                            className="login-form-button">
                            {loginLoading ? (<Icon type="loading"/>) : ''}
                            <span>登录</span>
                        </Button>
                    </FormItem>
                </Form>
                {/*<p className='login-copyright' align="center">Copyright © 2017 荐客极聘网络技术（苏州）有限公司</p>*/}
            </React.Fragment>
        );
    }
}
export default Form.create()(Login);
// export default connect(
//   ({user}) => ({...user}),
//   {...userModel.actions}
// )(LoginForm);
