/**
 * Created by YD on 2020/5/18.
 */
import React, {Component} from "react";
import {Card, Typography} from "antd";
import style from './index.scss'
// data: {
//     title: '推广服务',
//         text: '精准的化学品客群流量、丰富的化学品推广渠道。',
//         hoverText: '推广服务精准的化学品客群流量、丰富的化学品推广渠道。精准的化学品客群流量、丰富的化学品推广渠道。',
//         imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
// }
export default class FWDTCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {data} = this.props;
        return (
            <div className={style.fwdt_card_wrapper}>
                <Card style={{height: 321}}
                      cover={<img style={{ height: 321}} src={data.imgUrl} alt=""/>}>
                    <div className={style.fwdt_card_mask}>
                        <div className={style.fwdt_card_mask_content}>
                            <h3>{data.title}</h3>
                            <Typography.Paragraph ellipsis>{data.text}</Typography.Paragraph>
                            <p>{data.hoverText}</p>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
