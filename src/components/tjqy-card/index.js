import React, {Component} from "react";
import {Card, List, Typography} from "antd";
import  style from './index.scss'
const {Meta} = Card;


// data: {
//     companyName: '公司名称',
//         desc: 'www.instagram.com',
//         imgurl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
// }
export default class TJQYCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data: {companyName, desc, imgurl}} = this.props;
        return (
            <div className={style.tjqy_wrapper}>
                <Card
                    hoverable
                    bordered={false}
                    cover={<img alt="example" width="100%" height='120' src={imgurl}/>}>
                    <Meta title={companyName}
                          description={<Typography.Paragraph ellipsis>{desc}</Typography.Paragraph>}/>
                </Card>
            </div>
        )
    }
}
