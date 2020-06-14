/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {} from "antd";
import PageTitle from '../../../components/account/page-title'
import BaseInfo from '../../../components/account/base-info'
import style from "./index.scss";
export default class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                textList: ['免费开通摩贝店铺 ', ' 免费开通SaaS功能'],
                btnText: '立即完善公司信息'
            }
        };
    }

    componentDidMount() {
    }

    //完善基本信息
    onPerfectBase = () => {
        console.log('onPerfectBase');
    };
    //完善联系方式
    onPerfectContact = () => {
        console.log('onPerfectContact');
    };
    //完善公司信息
    onPerfectCompany = () => {
        console.log('onPerfectCompany');
    };

    render() {
        const info = this.info;
        return (<div id={style.account_info_wrapper}>
            <div className="mb20">
                <PageTitle title="账户资料"/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.base} onOpen={this.onPerfectBase}/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.contact} onOpen={this.onPerfectContact}/>
            </div>
            <div className="mb20">
                <BaseInfo {...info.company} onOpen={this.onPerfectCompany}/>
            </div>

        </div>);
    }
}
