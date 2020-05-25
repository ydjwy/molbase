import React, {Component} from "react";
import {Carousel,Row, Col} from "antd";
import NavMenu from '../../../components/nav-menu'
import WelcomeCard from '../../../components/welcome-card'
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
                list: [
                    {id: '0', name: '目录1', children: [{id: '0-0', name: '目录1选项1'}, {id: '0-1', name: '目录1选项2'}]},
                    {id: '2', name: '目录2', children: [{id: '2-0', name: '目录2选项1'}, {id: '2-1', name: '目录2选项2'}]},
                    {id: '3', name: '目录3', children: [{id: '3-0', name: '目录3选项1'}, {id: '3-1', name: '目录3选项2'}]},
                    {id: '4', name: '目录4', children: [{id: '4-0', name: '目录4选项1'}, {id: '4-1', name: '目录4选项2'}]}
                ]
            },
            carouselData: [
                {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                }, {
                    title: '推广服务',
                    imgUrl: 'http://img.molbase.net/vp/9n/s2/10309.jpeg',
                },

            ],
            welcomeData: {
                imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                buyerService: [//买家服务
                    {id: 1, name: '发布需求'},
                    {id: 2, name: '化工产品'},
                    {id: 3, name: '现货商城'},
                    {id: 4, name: '市场行情'},
                    {id: 5, name: '摩贝百科'},
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

    render() {
        const {navData, carouselData,welcomeData} = this.state;
        return (
            <div className={style.nav_view_wrapper}>
                <Row gutter={20}>
                    <Col span={5}>
                        <NavMenu data={navData}/>
                    </Col>
                    <Col span={13} className='pt20'>
                        <Carousel autoplay>
                            {carouselData&&carouselData.map((item,index)=>{
                                return (<div key={index}>
                                    <img src={item.imgUrl} width="100%" height="420" alt=""/>
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
