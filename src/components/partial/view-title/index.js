import React, {Component} from "react";
import  style from './index.scss'

// data: {
//     title: '交易大厅',
//         url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
// }
export default class ViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {data: {title, url}} = this.props;
        return (
            <div className={style.view_title_wrapper} style={{backgroundImage: `url(${url})`}}>
                <h1 align="center">{title}</h1>
            </div>
        )
    }
}
