import React from 'react';
import { Card, Form, Select, Button, Table, DatePicker, Modal, message } from 'antd';
import axios from './../../axios/index';
import utils from './../../utils/utils';
import FilterForm from './../../components/BaseForm/index';
import ETable from './../../components/ETable/index';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{

    state = {
        orderInfo:{},
        orderConfirmVisible:false
    }

    params = {
        page:1
    }

    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            field:'time',
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]

    
    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params) => {
        console.log(params)
        this.params = params;
        this.requestList();
    }
    // 请求订单列表的信息
    requestList = () => {
        axios.requestList(this, '/order/list', this.params, true);
    }

    // 结束订单确认
    handelConfirm = () => {
        let item = this.state.selectItem;
        if (!item) {
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible:true
                })
            }
        })
    }

    //结束订单
    handelFinishOrder = () => {
        let item = this.state.selectItem;
        axios.ajax({
            url:'order/finish_order',
            data:{
                params:{
                    orderId:item.id
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success('订单车结束成功')
                this.setState({
                    orderConfirmVisible:false
                })
                this.requestList();
            }
        })
    }
    // 打开订单详情
    openOrderDetail = () => {
        let item = this.state.selectItem;
        console.log(item)
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }

    
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'形式时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'ststus'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_fee'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            },
        ]
        const formItemLayout = {
            labelCol:{ span:5 },
            wrapperCol:{ span:19 }
        }
        return(
            <div>
                <Card>
                    <FilterForm formList = { this.formList } filterSubmit = { this.handleFilter }/>
                </Card>
                <Card style = {{ marginTop:10 }}>
                    <Button type = 'primary' style = {{marginRight:10}} onClick = { this.openOrderDetail }>订单详情</Button>
                    <Button type = 'primary' onClick = { this.handelConfirm }>结束订单</Button>
                </Card>
                <div className = 'content-wrap'>
                    <ETable
                        columns = { columns }
                        dataSource = { this.state.list }
                        pagination = { this.state.pagination }
                        selectedRowKeys = { this.state.selectedRowKeys }
                        // rowSelection={ false }
                        updateSelectedItem = { utils.updateSelectItem.bind(this) }
                        rowSelection = 'radio'
                        selectItem = { this.state.selectItem }
                        selectIds = { this.state.selectIds }
                     />
                </div>
                <Modal
                title = '结束订单'
                visible = { this.state.orderConfirmVisible }
                onCancel = { () => {
                    this.setState({
                        orderConfirmVisible:false
                    })
                }}
                onOk = { this.handelFinishOrder }
                width = { 600 }
                >
                    <Form layout = 'horizontal'>
                    <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>

            </div>
        )
    }
}

