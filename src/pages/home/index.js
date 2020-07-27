/**
 * Created by CI11840 on 2019/3/1.
 */
import React, {Component} from 'react';
import style from './index.scss'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
    }

    //组件装载完成
    componentDidMount() {
    }

    //组件更新
    componentWillReceiveProps(nextProps) {

    }

    //初始化
    init = (props) => {

    };

    render() {
        return (<div id={style.home_wrapper}>
            <img src={require("../../assets/imgs/home/home_02.jpg")} alt=""/>
            <img src={require("../../assets/imgs/home/home_03.jpg")} alt=""/>
            <img src={require("../../assets/imgs/home/home_04.jpg")} alt=""/>
            <img src={require("../../assets/imgs/home/home_05.jpg")} alt=""/>
            <img src={require("../../assets/imgs/home/home_06.jpg")} alt=""/>
            <img src={require("../../assets/imgs/home/home_07.jpg")} alt=""/>
        </div>);
    }
}
