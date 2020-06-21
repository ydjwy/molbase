import React, {Component} from "react";
import {Card, Icon, Avatar, Typography, Tabs, Row, Col} from "antd";
import style from './index.scss'
const {TabPane} = Tabs;
// data={
//     image:'',主图片
//     imageList:[],图片列表
//     art:‘’,货号
//     integral:‘’,积分
// }
export default class SPZSCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
    }

    onTabChange = (key) => {
        this.setState({image: key});
    }

    render() {
        const {data: {imageList, art, integral}} = this.props;
        const {image} = this.state;
        return (
            <div className={style.spzs_card_wrapper}>
                <Card cover={<img src={image || this.props.data.image}/>} bordered={false}>
                    <Tabs activeKey={image || this.props.data.image} onChange={this.onTabChange}>
                        {imageList && imageList.map(item => {
                            return <TabPane tab={<img width="30" height="30" src={item}/>} key={item}/>
                        })}
                    </Tabs>
                    <Row gutter={10}>
                        <Col span={18}>货号：{art}</Col>
                        <Col span={6} align="right">收藏</Col>
                    </Row>
                    <p>送大宗积分 {integral} </p>
                </Card>
            </div>
        );
    }
}

