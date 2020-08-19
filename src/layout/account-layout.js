/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Layout, Menu, Icon} from 'antd';
import "./account-layout.scss";

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

export default class AccountLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: '',
        };
        this.menuList = [
            {
                id: 1,
                code: '1',
                title: '账户管理',
                childList: [{
                    id: 11,
                    code: 'info',
                    title: '账户资料',
                }, {
                    id: 12,
                    code: 'invoice',
                    title: '发票信息',
                }, {
                    id: 13,
                    code: 'shipping-address',
                    title: '收货地址',
                }]
            }, {
                id: 2,
                code: '1',
                title: '买家中心',
                childList: [{
                    id: 21,
                    code: 'platform-order',
                    title: '平台订单',
                }]
            }
        ]
    }

    componentDidMount() {
        const {location: {pathname}} = this.props;
        const currentRoute = pathname.split('/')[2];
        this.setState({currentRoute});
    }

    onSelectMenu = (data) => {
        const {history} = this.props;
        history.push(data.key);
        this.setState({currentRoute: data.key});
    };

    render() {
        const {children} = this.props;
        const {currentRoute} = this.state;
        const menuList = this.menuList;
        return (
            <div id="account_layout_wrapper">
                <Layout>
                    <Content>
                        <Layout style={{padding: '24px 0', background: '#fff'}}>
                            <Sider width={200} style={{background: '#fff'}}>
                                <Menu mode="inline"
                                      selectedKeys={[currentRoute]}
                                      defaultOpenKeys={['1']}
                                      onSelect={this.onSelectMenu}
                                      style={{height: '100%'}}>
                                    {menuList.map(sItem => {
                                        return (<SubMenu key={sItem.id}
                                                         title={<span><Icon type="user"/>{sItem.title}</span>}>
                                            {sItem.childList.map(cItem => {
                                                return (<Menu.Item key={cItem.code}>{cItem.title}</Menu.Item>);
                                            })}
                                        </SubMenu>);
                                    })}
                                </Menu>
                            </Sider>
                            <Content style={{padding: '0 24px', minHeight: 280}}>{children}</Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        );
    }
}
