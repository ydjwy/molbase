import React, {Component} from "react";
import {Carousel, Row, Col} from "antd";
import NavMenu from '../../../components/partial/nav-menu'
import WelcomeCard from '../../../components/partial/welcome-card'
import {getStoreCategory, getSystemGroupData} from '../../../services/api1'
import style from './index.scss'


export default class NavView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewTitle: {
                title: '服务大厅',
                url: 'https://r.molbase.net/mall_v2/home/assets/images/title-deal.png'
            },
            navData: {
                list: [],
                name: 'cateName',
                id: 'id',
            },
            carouselData: [],
            welcomeData: {
                imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                buyerService: [//买家服务
                    {id: 1, name: '发布需求'},
                    {id: 2, name: '化工产品'},
                    {id: 3, name: '现货商城'},
                    {id: 4, name: '市场行情'},
                    {id: 5, name: '大综百科'},
                    {id: 6, name: '买家手册'},
                ],
                sellerService: [//卖家服务
                    {id: 1, name: '免费旺铺'},
                    {id: 2, name: '在线交易'},
                    {id: 3, name: 'SaaS服务'},
                    {id: 4, name: '营销推广'},
                    {id: 5, name: 'SGS认证'},
                    {id: 6, name: '供应链服务'},
                ],
                list: [
                    {id: 1, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
                    {id: 2, title: '摩库数据登陆纳斯达克，股票代码：MKD。[查看登陆纳斯达克，股票代码：MKD。[查看', url: ''},
                ]
            }
        };
    }

    componentDidMount() {
        const {navData} = this.state;
        const carouselCondition = {
            page: 0,
            size: 10,
            sort: 'id,desc',
            groupName: 'yshop_home_banner'
        };
        getStoreCategory().then(res => {
            this.setState({navData: {...navData, list: res.data.content}})
        });
        getSystemGroupData(carouselCondition).then(res => {
            this.setState({carouselData: res.data.content || []})
        })
    }

    render() {
        const {navData, carouselData, welcomeData} = this.state;
        return (
            <div className={style.nav_view_wrapper}>
                <Row gutter={20}>
                    <Col span={5}>
                        <NavMenu data={navData}/>
                    </Col>
                    <Col span={13} className='pt20'>
                        <Carousel autoplay>
                            {carouselData && carouselData.map((item, index) => {
                                return (<div key={index}>
                                    <img src={item.map.pic} width="100%" height="420" alt=""/>
                                </div>)
                            })}
                        </Carousel>
                    </Col>
                    <Col span={6} className='pt20'>
                        <WelcomeCard data={welcomeData}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
