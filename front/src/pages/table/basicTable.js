import React from 'react';
import { Card, Table, Modal, message, Button } from 'antd';
import axios from './../../../src/axios/index';
import utils from '../../utils/utils';

export default class BasicTable extends React.Component{

    state = {
        dataSource2:[],
        selectedRowKeys:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        const dataSource1 = [
            {
                key:'0',
                id:'0',
                username:'jack',
                sex:'1',
                state:'1',
                like:'1',
                birthday:'2019-09-09',
                address:'广东海洋大学主校区',
                time:'09：00'
            },
            {
                key:'1',
                id:'1',
                username:'tom',
                sex:'1',
                state:'2',
                like:'1',
                birthday:'2019-09-09',
                address:'广东海洋大学主校区',
                time:'09：00'
            },
            {
                key:'2',
                id:'2',
                username:'lily',
                sex:'1',
                state:'1',
                like:'1',
                birthday:'2019-09-09',
                address:'广东海洋大学主校区',
                time:'09：00'
            }
        ]
        this.setState({
            dataSource1:dataSource1
        }) 
        this.request();
    }
    
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
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:utils.pagination(res, (current) => {
                        _this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title : '信息',
            content:`用户名：${ record.username }, 用户爱好：${ record.like } `
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectItem:record
        })
    }
    handleDelte = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            ids.push(item.id);
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ ids.join(',')}`,
            onOk : () => {
                message.success("删除成功! ");
                this.request();
            }
        })
    }
    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex = 1? '男':'女'
                }
            },
            {
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
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const  selectedRowKeys  = this.state.selectedRowKeys;
        const rowSelection ={
            type: 'radio',
            selectedRowKeys
        }

        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
            
        }
        return(
            <div>
                <Card 
                 title = '基础表单'>
                     <Table
                        bordered
                        columns = { columns }
                        dataSource = { this.state.dataSource1 }
                        pagination = { false }
                     />
                </Card>

                <Card 
                 title = '动态数据渲染表格-Mock' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        columns = { columns }
                        dataSource = { this.state.dataSource2 }
                        pagination = { false }
                     />
                </Card>

                <Card 
                 title = 'Mock-单选' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        rowSelection ={ rowSelection }
                        onRow={(record, index) => {
                            return {
                              onClick: () => {
                                  this.onRowClick(record, index);
                              }
                            };
                          }}
                        columns = { columns }
                        dataSource = { this.state.dataSource2 }
                        pagination = { false }
                     />
                </Card>

                <Card  title = 'Mock-多选' style = {{margin:'10px 0'}}>
                    <div>
                        <Button onClick = { this.handleDelte }>删除</Button>
                    </div>
                     <Table
                        bordered
                        rowSelection ={ rowCheckSelection }
                        columns = { columns }
                        dataSource = { this.state.dataSource2 }
                        pagination = { false }
                     />
                </Card>

                <Card  title = 'Mock-表格分页' style = {{margin:'10px 0'}}>
                     <Table
                        bordered
                        columns = { columns }
                        dataSource = { this.state.dataSource2 }
                        pagination = { this.state.pagination }
                     />
                </Card>
            </div>
        )
    }
}