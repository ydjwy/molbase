/**
 * Created by YD on 2020/6/14.
 */
import React, {Component} from "react";
import {Card, Empty, Button} from 'antd';
import style from "./index.scss";

export default class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {title, text, textList, btnText,onOpen} = this.props;

        return (
            <div className={style.account_base_info_wrapper}>
                <Card size="small" title={title}>
                    <Empty description={
                        <React.Fragment>
                            <span>{text}</span>
                            <small>{textList.map((item, index) => <React.Fragment key={index}><br/><span>- {item}</span></React.Fragment>)}</small>
                        </React.Fragment>
                    }>
                        <Button type="link" onClick={onOpen}>{btnText}</Button>
                    </Empty>
                </Card>
            </div>
        );
    }
}
