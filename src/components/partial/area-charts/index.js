import React, {Component} from "react";
// import {Card, List, Typography} from "antd";
import {AreaChart, Tooltip, XAxis, YAxis, Area} from 'recharts';
import  style from './index.scss'
export default class AreaCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeData: [
        {
          "day": "05-01",
          "temperature": [
            -1,
            10
          ]
        },
        {
          "day": "05-02",
          "temperature": [
            2,
            15
          ]
        },
        {
          "day": "05-03",
          "temperature": [
            3,
            12
          ]
        },
        {
          "day": "05-04",
          "temperature": [
            4,
            12
          ]
        },
        {
          "day": "05-05",
          "temperature": [
            12,
            16
          ]
        },
        {
          "day": "05-06",
          "temperature": [
            5,
            16
          ]
        },
        {
          "day": "05-07",
          "temperature": [
            2,
            12
          ]
        },
        {
          "day": "05-08",
          "temperature": [
            0,
            8
          ]
        },
        {
          "day": "05-09",
          "temperature": [
            -3,
            5
          ]
        }
      ]
    };
  }

  render() {
    // const {data: {companyName, desc, imgurl}} = this.props;
    const {rangeData} = this.state;
    return (
      <div className={style.area_charts_wrapper}>
        <AreaChart
          width={600}
          height={250}
          data={rangeData}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <XAxis dataKey="day"/>
          <YAxis />
          <Area dataKey="temperature" stroke="#8884d8" fill="#8884d8"/>
          <Tooltip />
        </AreaChart>
      </div>
    )
  }
}
