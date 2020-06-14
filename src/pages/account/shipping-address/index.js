/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {} from "antd";
import PageTitle from '../../../components/account/page-title'
import style from "./index.scss";
export default class AccountShippingAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (<div id={style.account_shipping_address_wrapper}>
            <PageTitle title="地址管理"/>
        </div>);
    }
}
