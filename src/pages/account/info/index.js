/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import userModel from "store/reducers/user";
import {Descriptions} from "antd";
import PageTitle from '../../../components/account/page-title'
import BaseInfo from '../../../components/account/base-info'
import {getUserData, getUserApplicant} from '../../../services/api2'
import BaseModal from './base-modal'
import CompanyModal from './company-modal'
import ContactModal from './contact-modal'
import style from "./index.scss";
@connect(({user}) => ({...user}), {...userModel.actions})
export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseModal: {//基本信息弹框
                visible: false,
                isEdit: false
            },
            companyModal: {//公司信息弹框
                visible: false,
                isEdit: false
            },
            baseInfo: {},//账户信息
            companyInfo: {},//公司信息
        };
        this.info = {
            base: {
                title: '基本信息',
                text: '您还没有填写过基本信息',
                textList: [],
                btnText: '立即完善个人信息'
            },
            contact: {
                title: '联系方式',
                text: '您还没有填写过联系方式',
                textList: [],
                btnText: '立即完善联系方式'
            },
            company: {
                title: '公司信息',
                text: '完善公司信息后，您可获得以下权益',
                textList: ['免费开通大宗店铺 ', ' 免费开通SaaS功能'],
                btnText: '立即完善公司信息'
            }
        };
    }

    componentDidMount() {
        this.initBase();
        this.initCompany();
    }

    initBase = () => {
        const {userInfo: {user}} = this.props;
        getUserData({uid: user.uid}).then(res => this.setState({baseInfo: res.data || {}}));
    };
    initCompany = () => {
        const {userInfo: {user}} = this.props;
        getUserApplicant({uid: user.uid}).then(res => this.setState({companyInfo: res.data || {}}));
    }

    //完善基本信息
    onPerfectBase = (type) => {
        const {userInfo: {user}} = this.props;
        const {baseInfo} = this.state;
        if (type === 'new') {
            this.setState({baseModal: {visible: true, isEdit: false, uid: user.uid}});
        } else if (type === 'edit') {
            this.setState({baseModal: {visible: true, isEdit: true, data: baseInfo, uid: user.uid}});
        }
    };
    //完善联系方式
    onPerfectContact = () => {
        console.log('onPerfectContact');
    };
    //完善公司信息
    onPerfectCompany = () => {
        this.setState({companyModal: {visible: true, isEdit: false}});
    };
    //关闭基本信息弹框
    onCloseBaseModal = (isSave) => {
        if (isSave) {
            this.initBase();
        }
        this.setState({baseModal: {visible: false, isEdit: false}});
    };
    //关闭公司信息弹框
    onCloseCompanyModal = () => {
        this.setState({companyModal: {visible: false, isEdit: false}});
    };


    render() {
        const {baseModal, companyModal, baseInfo: {isExist}} = this.state;
        const info = this.info;
        return (<div id={style.account_info_wrapper}>
            <div className="mb20">
                <PageTitle title="账户资料"/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.base} isHaveContent={isExist} isEdit={isExist} onOpen={this.onPerfectBase}>
                    <BaseInfoShow {...this.state.baseInfo}/>
                </BaseInfo>
            </div>
            {isExist ? (
                <div className="mb20">
                    <BaseInfo {...info.contact} isHaveContent={isExist} isEdit={false} onOpen={this.onPerfectContact}>
                        <BaseInfoContactShow {...this.state.baseInfo} initBase={this.initBase}/>
                    </BaseInfo>
                </div>
            ) : null}
            <div className="mb20">
                <BaseInfo {...info.company} onOpen={this.onPerfectCompany}/>
            </div>
            {baseModal.visible ? <BaseModal baseModal={baseModal} onClose={this.onCloseBaseModal}/> : null}
            {companyModal.visible ?
                <CompanyModal companyModal={companyModal} onClose={this.onCloseCompanyModal}/> : null}
        </div>);
    }
}

class BaseInfoContactShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseModal: {//基本信息弹框
                visible: false,
            }
        }

    }

    //打开修改手机号弹框
    onShowEditModal = (type) => {
        const {userData} = this.props;
        const key = (type === 'phone') ? 'phone' : 'mailbox';
        this.setState({baseModal: {visible: true, data: userData, key, uid: userData.uid,}});
    };
    //取消或更新手机号
    onCloseModal = (isSave) => {
        const {initBase} = this.props;
        if (isSave) {
            initBase();
        }
        this.setState({baseModal: {visible: false}});
    }

    render() {
        const {isExist, userData} = this.props;
        const {baseModal} = this.state;
        return (<React.Fragment>
            {isExist ? (<Descriptions>
                <Descriptions.Item label="手机号码">
                    <span className="mr10">{userData.phone}</span>
                    <span className="mr10">{'已验证'}</span>
                    <a onClick={() => this.onShowEditModal('phone')}>修改</a>
                </Descriptions.Item>
                <Descriptions.Item label="电子邮箱">
                    <span>{userData.mailbox}</span>
                    <a onClick={() => this.onShowEditModal('email')}>修改</a>
                </Descriptions.Item>
            </Descriptions>) : null}
            {baseModal.visible ? <ContactModal baseModal={baseModal} onClose={this.onCloseModal}/> : null}
        </React.Fragment>);
    }
}

class BaseInfoShow extends Component {
    render() {
        const {isExist, userData} = this.props;
        return (<React.Fragment>
            {isExist ? (<Descriptions>
                <Descriptions.Item label="昵称">{userData.userName}</Descriptions.Item>
                <Descriptions.Item label="性别">{userData.genderName}</Descriptions.Item>
                <Descriptions.Item label="生日">{userData.year}</Descriptions.Item>
                <Descriptions.Item label="所在地">{userData.detailedAddress}</Descriptions.Item>
            </Descriptions>) : null}
        </React.Fragment>);
    }
}

//
// class CompanyInfoShow extends Component {
//     render() {
//         const {isExist, userData} = this.props;
//         return (<React.Fragment>
//             {isExist ? (<Descriptions>
//                 <Descriptions.Item label="昵称">{userData.userName}</Descriptions.Item>
//                 <Descriptions.Item label="性别">{userData.genderName}</Descriptions.Item>
//                 <Descriptions.Item label="生日">{userData.year}</Descriptions.Item>
//                 <Descriptions.Item label="所在地">{userData.detailedAddress}</Descriptions.Item>
//             </Descriptions>) : null}
//         </React.Fragment>);
//     }
// }