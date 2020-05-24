/**
 * Created by YD on 2020/5/18.
 */
import React, {Component} from "react";
import {Card, List, Typography} from "antd";
import style from './index.scss'
// data: {
//     title: '生物医药及化学品',
//         list: [
//         {id: 1, title: '磷酸锌', url: ''},
//         {id: 2, title: '硫酸铜', url: ''},
//         {id: 3, title: '硝酸铁(III) 九水合物', url: ''},
//         {id: 4, title: '钨酸钙）', url: ''},
//         {id: 5, title: '氟化锰(II)）', url: ''},
//         {id: 6, title: '氟化铅）', url: ''}
//     ]
// }
export default class CPFLCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {data: {title, list}} = this.props;
        return (
            <div className={style.cpfl_card_wrapper}>
                <Card size="small" title={title}>
                    <List
                        bordered={false}
                        dataSource={list||[]}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Paragraph ellipsis>{item.title}</Typography.Paragraph>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}
