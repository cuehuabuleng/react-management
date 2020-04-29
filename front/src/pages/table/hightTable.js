import React from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from './../../axios/index';
import utils from '../../utils/utils'; 
import dataSource from './data';
export default class HightTable extends React.Component{

        state = {

        }
        params = {
            page:1
        }
        
    componentDidMount(){
        // this.request();
        this.setState({
            dataSource:dataSource[0],
            dataSource1:dataSource[1]
        })

    }

    //动态获取mock数据
    request = () => {
        let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    dataSource:res.result.list
                })
            }
        })
    }

    handelChange = (pagination, filters, sorter) => {
        console.log(sorter)
        this.setState({
            sortOrder:sorter.order
        })
    }

    handleDelete  = (item) => {
        let id = item.id;
        console.log(item)
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功')
            }
        })
    }
    render(){
        const columns = [
            {
                width:80,
                title:'id',
                dataIndex:'id',
            },
            {
                width:80,
                title:'用户名',
                dataIndex:'userName'
            },
            {
                width:80,
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex = 1? '男':'女'
                }
            },
            {
                width:80,
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华才子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                width:80,
                title:'爱好',
                dataIndex:'like',
                render(like){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[like];
                }
            },
            {
                width:80,
                title:'生日',
                dataIndex:'birthday'
            },
            {
                width:80,
                title:'地址',
                dataIndex:'adress'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time'
            }
        ]

        const columns2 = [
            {
                width:80,
                title:'id',
                dataIndex:'id',
                fixed:'left'
            },
            {
                width:80,
                title:'用户名',
                dataIndex:'userName',
                fixed:'left'
            },
            {
                width:80,
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex = 1? '男':'女'
                }
            },
            {
                width:80,
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华才子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                width:80,
                title:'爱好',
                dataIndex:'like',
                render(like){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[like];
                }
            },
            {
                width:80,
                title:'生日',
                dataIndex:'birthday'
            },
            {
                width:120,
                title:'地址',
                dataIndex:'adress'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time1'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time2'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time3'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time4'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time5'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time6'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time7'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time8'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time9'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time10'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time11'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time12'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time13'
            }
        ]

        const columns3 = [
            {
                width:80,
                title:'id',
                dataIndex:'id',
            },
            {
                width:80,
                title:'用户名',
                dataIndex:'userName'
            },
            {
                width:80,
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex = 1? '男':'女'
                }
            },
            {
                width:80,
                title:'年龄',
                dataIndex:'age',
                sorter:(a, b) => {
                    return a.age - b.age
                },
                sortOrder:this.state.sortOrder
            },
            {
                width:80,
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华才子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                width:80,
                title:'爱好',
                dataIndex:'like',
                render(like){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[like];
                }
            },
            {
                width:80,
                title:'生日',
                dataIndex:'birthday'
            },
            {
                width:80,
                title:'地址',
                dataIndex:'adress'
            },
            {
                width:80,
                title:'早起时间',
                dataIndex:'time'
            }
        ]

        const columns4 = [
            {
                width:80,
                title:'id',
                dataIndex:'id',
            },
            {
                width:80,
                title:'用户名',
                dataIndex:'userName'
            },
            {
                width:80,
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex = 1? '男':'女'
                }
            },
            {
                width:80,
                title:'年龄',
                dataIndex:'age'
            },
            {
                width:80,
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华才子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                width:80,
                title:'爱好',
                dataIndex:'like',
                render(like){
                    let config = {
                        '1':<Badge status = 'success' text = '成功'/>,
                        '2':<Badge status = 'error' text = '报错'/>,
                        '3':<Badge status = 'default' text = '正常'/>,
                        '4':<Badge status = 'processing' text = '进行中'/>,
                        '5':<Badge status = 'warning' text = '警告'/>
                    }
                    return config[like];
                }
            },
            {
                width:80,
                title:'生日',
                dataIndex:'birthday'
            },
            {
                width:80,
                title:'地址',
                dataIndex:'adress'
            },
            {
                width:80,
                title:'操作',
                render:(text, item) => {
                    return <Button  onClick = { (item) => { this.handleDelete(item) } }>删除</Button>
                }
            }
        ]
        return(
            <div>
                {/* <iframe src="http://localhost:8601/" frameborder="0" style = {{ width:'100%',height:'100vh'}}/> */}
                <Card 
                 title = '头部固定'>
                     <Table
                        bordered
                        scroll = {{y:300}}
                        columns = { columns }
                        dataSource = { this.state.dataSource }
                        pagination = { false }
                     />
                </Card>

                <Card 
                 title = '左侧固定' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        scroll = {{x:1700}}
                        columns = { columns2 }
                        dataSource = { this.state.dataSource }
                        pagination = { false }
                     />
                </Card>

                <Card 
                 title = '排序' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        columns = { columns3 }
                        dataSource = { this.state.dataSource1 }
                        pagination = { false }
                        onChange = { this.handelChange }
                     />
                </Card>
                <Card 
                 title = '操作' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        columns = { columns4 }
                        dataSource = { this.state.dataSource1 }
                        pagination = { false }
                        onChange = { this.handelChange }
                     />
                </Card>
            </div>
        )
    }
}
