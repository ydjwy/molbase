import React, {Component} from "react";
import {Table, Checkbox, Button} from 'antd';
import  style from './index.scss'

export default class ShoppingCartStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = [
            {
                title: <Checkbox>全选</Checkbox>, width: 80, dataIndex: 'date', key: 'dte',
                render: (text, record) => (<span className='pl10'><Checkbox/></span>)
            },
            {title: '产品名称', width: 200, dataIndex: 'name', key: 'name'},
            {title: '品牌|货号', dataIndex: 'name1', key: 'name1'},
            {title: '货期', dataIndex: 'name1', key: 'name2'},
            {title: '规格', dataIndex: 'name1', key: 'nam1'},
            {title: '单价', dataIndex: 'name1', key: 'nam'},
            {title: '数量', dataIndex: 'name1', key: 'nme1'},
            {title: '小计', dataIndex: 'name1', key: 'na1'},
            {title: '操作', dataIndex: 'name1', key: 'ame1'}
        ];
    }

    //立即结算
    onSettlement = () => {
        const {onSubmit} = this.props;
        onSubmit();

    };

    render() {
        const columns = this.columns;
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return (
            <div className={style.shopping_cart_step1_wrapper}>
                <h3>全部商品 0</h3>
                <Table columns={columns} className='table_title_box'/>
                <h4>
                    <div className="dib w60">商家名称 标识</div>
                    <div className="dib w40" align="right">服务热线：400-4564-3535（9:00-18:00）</div>
                </h4>
                <Table columns={columns} pagination={false} dataSource={data} showHeader={false}/>
                <div className={style.shopping_cart_step1_footer}>
                    <div className="dib w20">
                        <Checkbox>全选</Checkbox>
                        <a>删除选中的商品</a>
                    </div>
                    <div className="dib w80" align="right">
                        <span className="mr10">已选择 0 件商品</span>
                        <span className="mr10">总价（不含运费）：</span>
                        <span className="mr10">￥0.00</span>
                        <span className="mr10">共节省：-￥0.00</span>
                        <Button type="danger" onClick={this.onSettlement}>立即结算</Button>
                    </div>

                </div>
            </div>
        )
    }
}
