/**
 * Created by YD on 2020/5/18.
 */
import React, {Component} from "react";
import {Card} from "antd";
import style from './index.scss'
// data: {
//     title: '推广服务推广服务',
//         imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
// }
export default class PPGCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {data} = this.props;
        return (
            <div className={style.ppg_card_wrapper}>
                <Card style={{width: '100%', height: 98}}
                      cover={<img style={{width: '100%', height: 98}} src={data.imgUrl}/>}>
                    <div className='ppg_card_mask'>
                        <div className='ppg_card_mask_content'>
                            <h4>{data.title}</h4>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
