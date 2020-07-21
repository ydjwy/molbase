import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Card, /*List, Typography,*/ Row, Col, Button, Tabs} from "antd";
import  style from './index.scss'
// const {Paragraph} = Typography;
const {TabPane} = Tabs;
@connect(({user}) => ({...user}), {...userModel.actions})

// data: {
//         buyerService: [//买家服务
//         {id: 1, name: '发布需求'},
//         {id: 2, name: '化工产品'},
//         {id: 3, name: '现货商城'},
//         {id: 4, name: '市场行情'},
//         {id: 5, name: '大宗百科'},
//         {id: 6, name: '买家手册'},
//     ],
//         sellerService: [//卖家服务
//         {id: 1, name: '免费旺铺'},
//         {id: 2, name: '在线交易'},
//         {id: 3, name: 'SaaS服务'},
//         {id: 4, name: '营销推广'},
//         {id: 5, name: 'SGS认证'},
//         {id: 6, name: '供应链服务'},
//     ],
//         list: [
//         {id: 1, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
//         {id: 2, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
//     ]
// }
export default class WelcomeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    //跳转登录页
    onLogin = () => {
        const {history} = this.props;
        history.push('/user/login')
    }
    //跳转注册页
    onRegister = () => {
        const {history} = this.props;
        history.push('/user/register')
    };
    //已登录
    loggedIn = () => {
    }

    render() {
        const {userInfo: {user}} = this.props;
        return (
            <div className={style.welcome_wrapper}>
                <Card>
                    {user && user.uname ? <LoggedIn {...this.props}/> : <NotLoggedIn {...this.props}/>}
                </Card>
            </div>
        )
    }
}
//未登录
class NotLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //跳转登录页
    onLogin = () => {
        const {history} = this.props;
        history.push('/user/login')
    }
    //跳转注册页
    onRegister = () => {
        const {history} = this.props;
        history.push('/user/register')
    };

    render() {
        const {data: {/*list,*/ buyerService, sellerService, images}} = this.props;
        return (
            <React.Fragment>
                <h3 align="center" className="fs16">欢迎来到辽西大宗</h3>
                <Row gutter={20} className='mb20 mt20'>
                    <Col span={12}>
                        <Button type="primary" onClick={this.onLogin}>请登录</Button>
                    </Col>
                    <Col span={12}>
                        <Button onClick={this.onRegister}>免费注册</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="买家服务" key="1">
                        <Row gutter={10}>
                            {buyerService && buyerService.map(item => {
                                return (<Col span={8} key={item.id} className='mb10'>
                                    <Button className='fs12'>{item.name}</Button></Col>)
                            })}
                        </Row>
                    </TabPane>
                    <TabPane tab="卖家服务" key="2">
                        <Row gutter={10}>
                            {sellerService && sellerService.map(item => {
                                return (<Col span={8} key={item.id} className='mb10'><Button
                                    className='fs12'>{item.name}</Button></Col>)
                            })}
                        </Row>
                    </TabPane>
                </Tabs>
                {images && images.map((item, index) => {
                    return <img width='100%' key={index} src={item} className="mt20" alt=""/>
                })}
                {/*<List*/}
                {/*size="small"*/}
                {/*dataSource={list}*/}
                {/*renderItem={item => <List.Item><Paragraph ellipsis>{item.title}</Paragraph></List.Item>}*/}
                {/*/>*/}

            </React.Fragment>)
    }
}

//已登录
class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //跳转用户中心
    goAccountCenter = () => {
        const {history} = this.props;
        history.push('/account/info')
    }

    render() {
        const {userInfo: {user}, data: {images}} = this.props;
        return (
            <React.Fragment>
                <h3 align="center">{user && user.uname}，欢迎您回来</h3>
                <Row className=' mt40'>
                    <Col span={12} align="center">
                        <h3 align="center">
                            <a>0</a>
                            <small className="12">个</small>
                        </h3>
                        <span>-待处理报价-</span>
                    </Col>
                    <Col span={12} align="center">
                        <h3 >
                            <a>0</a>
                            <small className="12">个</small>
                        </h3>
                        <span>-进行中的订单-</span>
                    </Col>
                </Row>
                <Row gutter={20} className=' mt40'>
                    <Col span={24}>
                        <Button type="primary" onClick={this.goAccountCenter}>进入用户中心</Button>
                    </Col>
                </Row>
                <Row gutter={20} className='mb30  mt40'>
                    <Col span={12}>
                        <Button>采购信息</Button>
                    </Col>
                    <Col span={12}>
                        <Button>商城订单</Button>
                    </Col>
                </Row>
                {images && images.map((item, index) => {
                    return <img width='100%' key={index} src={item} className="mt20" alt=""/>
                })}
                {/*<List*/}
                {/*size="small"*/}
                {/*dataSource={list}*/}
                {/*renderItem={item => <List.Item><Paragraph ellipsis>{item.title}</Paragraph></List.Item>}*/}
                {/*/>*/}
            </React.Fragment>)
    }
}
