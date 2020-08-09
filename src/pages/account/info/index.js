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
        const currentUser = localStorage.getItem('currentUser');
        if (!!currentUser) {
            this.initBase();
            this.initCompany();
        } else {
            window.location.href = '/#/user/login';
        }

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
    //完善公司信息
    onPerfectCompany = (type) => {
        const {userInfo: {user}} = this.props;
        const {companyInfo} = this.state;
        if (type === 'new') {
            this.setState({companyModal: {visible: true, isEdit: false, uid: user.uid}});
        } else if (type === 'edit') {
            this.setState({companyModal: {visible: true, isEdit: true, data: companyInfo, uid: user.uid}});
        }

    };
    //关闭基本信息弹框
    onCloseBaseModal = (isSave) => {
        if (isSave) {
            this.initBase();
        }
        this.setState({baseModal: {visible: false, isEdit: false}});
    };
    //关闭公司信息弹框
    onCloseCompanyModal = (isSave) => {
        console.log(213215423, isSave)
        if (isSave) {
            this.initCompany();
        }
        this.setState({companyModal: {visible: false, isEdit: false}});
    };


    render() {
        const {baseModal, companyModal, baseInfo, companyInfo} = this.state;
        const info = this.info;
        return (<div id={style.account_info_wrapper}>
            <div className="mb20">
                <PageTitle title="账户资料"/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.base} isHaveContent={baseInfo.isExist} isEdit={baseInfo.isExist}
                          onOpen={this.onPerfectBase}>
                    <BaseInfoShow {...baseInfo}/>
                </BaseInfo>
            </div>
            {baseInfo.isExist ? (
                <div className="mb20">
                    <BaseInfo {...info.contact} isHaveContent={baseInfo.isExist} isEdit={false}>
                        <BaseInfoContactShow {...baseInfo} initBase={this.initBase}/>
                    </BaseInfo>
                </div>
            ) : null}
            <div className="mb20">
                <BaseInfo {...info.company} isHaveContent={companyInfo.isExist} isEdit={companyInfo.isExist}
                          onOpen={this.onPerfectCompany}>
                    <CompanyInfoShow {...companyInfo}/>
                </BaseInfo>
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
                    <span className="mr10">{userData.mailbox}</span>
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
        return (isExist ? (<Descriptions>
            <Descriptions.Item label="昵称">{userData.userName}</Descriptions.Item>
            <Descriptions.Item label="性别">{userData.genderName}</Descriptions.Item>
            <Descriptions.Item label="生日">{userData.year}</Descriptions.Item>
            <Descriptions.Item label="所在地">{userData.detailedAddress}</Descriptions.Item>
        </Descriptions>) : null);
    }
}


class CompanyInfoShow extends Component {
    //展示图片
    showImg = (url) => {
        return url ? <img src={url} width="50" height="50" alt=""/> : null
    };

    render() {
        const {isExist, applicant, company} = this.props;
        return (<React.Fragment>
            {isExist ? (<React.Fragment>
                <Descriptions title="申请人信息">
                    <Descriptions.Item label="姓名">{applicant.userName}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{applicant.phone}</Descriptions.Item>
                    <Descriptions.Item label="身份">{applicant.identityName}</Descriptions.Item>
                    <Descriptions.Item label="身份证明">{this.showImg(applicant.proveUrl)}</Descriptions.Item>
                    <Descriptions.Item label="身份证头像面">{this.showImg(applicant.idCardHeadUrl)}</Descriptions.Item>
                    <Descriptions.Item label="身份证国徽面">{this.showImg(applicant.idCardNationalUrl)}</Descriptions.Item>
                </Descriptions>
                <Descriptions title="公司信息">
                    <Descriptions.Item label="公司名称">{company.companyName}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{company.telephone}</Descriptions.Item>
                    <Descriptions.Item label="所在地">{company.detailedAddress}</Descriptions.Item>
                    <Descriptions.Item label="公司类型">{company.companyType}</Descriptions.Item>
                    <Descriptions.Item label="企业证照">{this.showImg(company.enterpriseLicenseUrl)}</Descriptions.Item>
                </Descriptions>
            </React.Fragment>) : null}
        </React.Fragment>);
    }
}