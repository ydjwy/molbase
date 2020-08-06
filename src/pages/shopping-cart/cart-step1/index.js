import React, {Component} from "react";
import {Table, Checkbox, Button, InputNumber} from 'antd';
import  {myCartGoodsList, modifyMyCartGoodsNum, delMyCartGoods} from '../../../services/api2'
import  style from './index.scss'
let allGoods = [];//全部商品的id
let goodsTotal = 0;//全部商品总数
let goodsTotalPrice = 0;//全部商品总价;
export default class ShoppingCartStep1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartGoodsInfo: {},//购物车商品信息
            selectedGoods: [],//选中的商品id集合
            selectGoodsTotal: 0,//选中的商品总数
            selectGoodsTotalPrice: 0,//选择的商品总价
        };
        this.columns = [
            {title: '产品名称', width: 200, dataIndex: 'productName'},
            {title: '品牌|货号', width: 200, dataIndex: 'barCode'},
            {title: '货期', width: 100, dataIndex: 'deliveryPeriod'},
            {title: '规格', width: 100, dataIndex: 'suk'},
            {
                title: '单价',
                width: 80,
                dataIndex: 'price',
                render: (text, record) => `￥${record.price}/${record.unitName}`
            },
            {
                title: '数量',
                width: 120,
                dataIndex: 'cartNum',
                render: (text, record) => <InputNumber min={1} value={text}
                                                       onChange={(v) => this.onChangeCartNum(v, record)}/>
            },
            {title: '小计', width: 100, render: (text, record) => `￥${record.price * record.cartNum}`},
            {title: '操作', render: (text, record) => <a onClick={() => this.onDeleteGoods({ids: [record.carId]})}>删除</a>}
        ];
    }

    componentDidMount() {
        this.init();
    }

    //初始化
    init = () => {
        myCartGoodsList().then(res => {
            if (res.status === 200) {
                let num = 0;
                let price = 0;
                res.data && res.data.store && res.data.store.forEach(item => {
                    item.productAttrDataVo.forEach(pItem => {
                        num += pItem.cartNum;
                        price += pItem.price * pItem.cartNum;
                        allGoods.push(pItem.carId);
                    })
                });
                goodsTotal = num;
                goodsTotalPrice = price;
                this.setState({cartGoodsInfo: res.data});
            }
        })
    }
    //修改商品数量
    onChangeCartNum(v, record) {
        modifyMyCartGoodsNum({id: record.carId, number: v}).then(res => {
            if (res.status === 200) {
                this.init();
            }
        })
    }

    //删除商品
    onDeleteGoods = (data) => {
        delMyCartGoods(data).then(res => {
            if (res.status === 200) {
                this.init();
            }
        })
    };

    //设置表头全选
    rowSelectionHeader = () => {
        return {title: this.getAllSelectNode(), width: 60}
    };
    //获取全选复选框节点
    getAllSelectNode = () => {
        const {selectedGoods} = this.state;
        const allNode = (<Checkbox disabled={allGoods.length <= 0} onChange={this.onAllSelectGoods}
                                   checked={selectedGoods.length > 0 && selectedGoods.length === allGoods.length}
                                   indeterminate={selectedGoods.length > 0 && selectedGoods.length < allGoods.length}/>);
        return allNode;
    }
    //全选事件
    onAllSelectGoods = (e) => {
        const checked = e.target.checked;
        this.setState({
            selectedGoods: checked ? allGoods : [],
            selectGoodsTotal: checked ? goodsTotal : 0,
            selectGoodsTotalPrice: checked ? goodsTotalPrice : 0,
        });
    }
    //立即结算
    onSettlement = () => {
        const {onSubmit} = this.props;
        onSubmit();
    };
    //选择商品
    onSelectGoods = (record, selected) => {
        const {selectedGoods, selectGoodsTotal, selectGoodsTotalPrice} = this.state;
        if (selected && !selectedGoods.includes(record.carId)) {
            this.setState({
                selectedGoods: [...selectedGoods, record.carId],
                selectGoodsTotal: selectGoodsTotal + record.cartNum,
                selectGoodsTotalPrice: selectGoodsTotalPrice + record.price * record.cartNum
            })
        } else if (!selected && selectedGoods.includes(record.carId)) {
            this.setState({
                selectedGoods: selectedGoods.filter(item => item !== record.carId),
                selectGoodsTotal: selectGoodsTotal - record.cartNum,
                selectGoodsTotalPrice: selectGoodsTotalPrice - record.price * record.cartNum
            })
        }


    };
    //获取展示购物车商品详情列表
    getShowCartGoodsList = () => {
        const {cartGoodsInfo: {store}, selectedGoods} = this.state;
        const columns = this.columns;
        const showCartGoodsList = store && store.map(item => {
                return (<React.Fragment key={item.productId}>
                    <h4>
                        <div className="dib w60">
                            <img src={item.storeLogo} width="20" height="20" alt=""/>
                            {item.storeName}
                        </div>
                        <div className="dib w40" align="right">服务热线：400-4564-3535（9:00-18:00）</div>
                    </h4>
                    <Table rowKey='carId'
                           rowSelection={{
                               onSelect: this.onSelectGoods,
                               selectedRowKeys: selectedGoods
                           }}
                           columns={columns}
                           pagination={false}
                           dataSource={item.productAttrDataVo}
                           showHeader={false}/>
                </React.Fragment>)
            })
        return showCartGoodsList;
    };


    render() {
        const {selectGoodsTotal, selectedGoods,selectGoodsTotalPrice} = this.state;
        const showCartGoodsList = this.getShowCartGoodsList();
        const columns = [this.rowSelectionHeader(), ...this.columns];
        return (
            <div className={style.shopping_cart_step1_wrapper}>
                <h3>全部商品 {goodsTotal}</h3>
                <Table columns={columns} className='table_title_box'/>
                {showCartGoodsList}
                <div className={style.shopping_cart_step1_footer}>
                    <div className="dib w20">
                        {this.getAllSelectNode()}
                        <span className="ml5">全选</span>
                        <a className="ml5" onClick={() => this.onDeleteGoods({ids: selectedGoods})}>删除选中的商品</a>
                    </div>
                    <div className="dib w80" align="right">
                        <span className="mr10">已选择 {selectGoodsTotal} 件商品</span>
                        <span className="mr10">总价（不含运费）：</span>
                        <span className="mr10">￥{selectGoodsTotalPrice}</span>
                        <span className="mr10">共节省：-￥0.00</span>
                        <Button type="danger" onClick={this.onSettlement}>立即结算</Button>
                    </div>
                </div>
            </div>
        )
    }
}
