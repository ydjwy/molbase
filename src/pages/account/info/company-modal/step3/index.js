/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Result} from "antd";
import style from "./index.scss";
export default class CompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        return (<div id={style.company_modal_step3_wrapper}>
            <Result
                status="success"
                title="完成认证信息"
                // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            />
        </div>);
    }
}
