/**
 * Created by YD on 2020/5/18.
 */
import React, {Component} from "react";
import {Menu, Button, Divider} from "antd";
import style from './index.scss'
const {Item} = Menu;
// data: {
//     list: [
//         {id: '0', name: '目录1', children: [{id: '0-0', name: '目录1选项1'}, {id: '0-1', name: '目录1选项2'}]},
//         {id: '2', name: '目录2', children: [{id: '2-0', name: '目录2选项1'}, {id: '2-1', name: '目录2选项2'}]},
//         {id: '3', name: '目录3', children: [{id: '3-0', name: '目录3选项1'}, {id: '3-1', name: '目录3选项2'}]},
//         {id: '4', name: '目录4', children: [{id: '4-0', name: '目录4选项1'}, {id: '4-1', name: '目录4选项2'}]}
//     ]
// }
export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {data: {list,id='id',name='name'}} = this.props;
        return (
            <div className={style.nav_menu_wrapper}>
                <Menu mode="vertical" theme="dark" overflowedIndicator={false}>
                    {list && list.map(sItem => {
                        return (<Item key={sItem[id]}>
                            {sItem[name]}
                            <div className='nav_detail_box'>
                                <h3>{sItem[name]}</h3>
                                <Divider/>
                                {sItem.children && sItem.children.map(gItem => {
                                    return <Button key={gItem[id]} type='link'>{gItem[name]}</Button>
                                })}
                            </div>
                        </Item>)
                    })}
                </Menu>
            </div>
        );
    }
}
