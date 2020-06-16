import React, {PureComponent} from "react";
import {Form, Icon, Input, Button, Checkbox, Modal, Select, Spin, Alert} from "antd";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {getCookie} from "../../utils/cookie";
import {showPageTitle} from '../../utils/util'
import debounce from 'lodash/debounce';
import "./login.scss";
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({user}) => ({...user}), {...userModel.actions})
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bindAccountModal: {
        visible: false,
      },
      accountId: '',
      bindError: {
        visible: false,
        text: '请选择账号'
      },
      loginLoading: false,//登录加载loading
      bindLoading: false,//绑定账号加载loading
    };
    this.handleSearch = debounce(this.handleSearch, 400);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      userName: getCookie('userName'),
    });
    showPageTitle(this.props.history.location.pathname);
  }

  handleSubmit = e => {
    const {login} = this.props;
    e.preventDefault();
    this.setState({loginLoading: true});
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          if (res.code === 200) {
            if (res.result && res.result.roleType === 'superadmin') {
              this.setState({bindAccountModal: {visible: true}, accountId: ''})
            }
          } else {
            this.setState({loginLoading: false});
          }
        });
      } else {
        this.setState({loginLoading: false});
      }
    });
  };

  //绑定按钮
  onBindAccountOk = () => {
    const {userInfo: {userName}, bindAccountLogin} = this.props;
    const {accountId, bindError} = this.state;
    if (accountId) {
      this.setState({bindLoading: true});
      bindAccountLogin({userName, bindAccountUid: accountId}).then(res => {
        if (res.code !== 200) {
          this.setState({bindLoading: false});
        }
      });
      this.setState({bindAccountModal: {visible: false}});
    } else {
      this.setState({bindError: {...bindError, visible: true}});
    }
  };
  //取消按钮
  onBindAccountCancel = () => {
    this.setState({bindAccountModal: {visible: false}});
  };
  //搜索账号
  handleSearch = (value) => {
    if (!!value) {
      const {queryAccountsBySearchKey} = this.props;
      queryAccountsBySearchKey(value);
    }
  };
  //选中的账号改变
  handleChange = (value) => {
    const {bindError} = this.state;
    this.setState({accountId: value});
    if (!value) {
      this.setState({bindError: {...bindError, visible: true}});
    } else {
      this.setState({bindError: {...bindError, visible: false}});
    }

  };

  render() {
    const {form: {getFieldDecorator}, bindAccountList} = this.props;
    const {bindAccountModal: {visible}, accountId, bindError, loginLoading, bindLoading} = this.state;
    const showBindAccountList = bindAccountList && bindAccountList.records && bindAccountList.records.map(item => {
        return <Option key={item.uid} value={item.uid}>{`${item.englishName}(${item.name})`}</Option>
      });
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form" autoComplete="off">
          <h1>用户登录</h1>
          <FormItem>
            {getFieldDecorator("userName", {
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
            {getFieldDecorator("autoLogin", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>自动登录</Checkbox>)}
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
        <Modal
          title='绑定账号'
          width={700}
          visible={visible}
          confirmLoading={bindLoading}
          maskClosable={false}
          onOk={this.onBindAccountOk}
          onCancel={this.onBindAccountCancel}>
          <label>绑定账号：</label>
          <Select
            showSearch
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            notFoundContent={bindAccountList.loading ? <Spin size="small"/> : null}
            value={accountId}
            style={{width: '300px'}}>
            {showBindAccountList}
          </Select>
          {bindError.visible ? (
            <Alert message={bindError.text} type="warning" style={{width: '370px', marginTop: '20px'}}/>) : ''}
        </Modal>
      </React.Fragment>
    );
  }
}
export default Form.create()(Login);
// export default connect(
//   ({user}) => ({...user}),
//   {...userModel.actions}
// )(LoginForm);
