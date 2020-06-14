/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import style from "./index.scss";

export default class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {title} = this.props;
        return (
            <div className={style.account_page_title_wrapper}>
                <h3>{title}</h3>
            </div>
        );
    }
}
