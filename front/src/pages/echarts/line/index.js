import  React from 'react';
import { Card } from 'antd';
import echartsTheme from './../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default class Line extends React.Component{

    componentWillMount(){
        echarts.registerTheme('Imooc', echartsTheme)
    }

    getOption = () => {

        let option = { 
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        1254,
                        5456,
                        1545,
                        12000,
                        9875,
                        1593
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {

        let option = { 
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            legend:{
                data:['OFO订单量','摩拜订单量']
            },
            xAxis:{
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO订单量',
                    type:'line',
                    data:[
                        12012,
                        12012,
                        5464,
                        2123,
                        5338,
                        8723,
                        3235
                    ]
                },
                {
                    name:'摩拜订单量',
                    type:'line',
                    data:[
                        1000,
                        1254,
                        5456,
                        1545,
                        12000,
                        9875,
                        1593
                    ]
                }
            ]
        }
        return option;
    }

    
    getOption3 = () => {

        let option = { 
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                type:'category',
                boundaryGap:false,
                data:[
                    '周一','周二','周三','周四','周五','周六','周日'
                ]
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[
                        1000,
                        1254,
                        5456,
                        1545,
                        12000,
                        9875,
                        1593
                    ],
                    areaStyle:{}
                }
            ]
        }
        return option;
    }
    
    
    render(){
        return(
            <div>
                <Card title = '折线图之一'>
                    <ReactEcharts option = { this.getOption() } theme = 'Imooc' style = {{ height:500  }}/>
                </Card>
                <Card title = '折线图之二' style = {{ marginTop:10 }}>
                <ReactEcharts option = { this.getOption2() } theme = 'Imooc' style = {{ height:500  }}/>
                </Card>
                <Card title = '折线图之三' style = {{ marginTop:10 }}>
                <ReactEcharts option = { this.getOption3() } theme = 'Imooc' style = {{ height:500  }}/>
                </Card>
            </div>
        )
    }
}