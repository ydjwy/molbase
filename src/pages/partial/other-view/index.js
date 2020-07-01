import React, {Component} from "react";
import {Row, Col, Divider} from "antd";
import  style from './index.scss'


export default class OtherView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let datas = ['关于我们', <Divider type="vertical"/>, '关于我们', <Divider type="vertical"/>, '关于我们',
            <Divider type="vertical"/>, '关于我们', <Divider type="vertical"/>, '关于我们']
        return (
            <div className={style.other_view_wrapper}>
                <Row>
                    <Col span={24} align="center">
                        <div className="dib pb20 pt20 pl30 pr30" style={{borderTop:'1px solid #E8E8E8'}}>
                            {datas.map((item, index) => {
                                return <React.Fragment key={index}>
                                    {item}
                                </React.Fragment>
                            })}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
