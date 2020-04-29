import React from 'react';
import { Card, Form, Select, Button, Table, Modal, message } from 'antd';
import axios from '../../axios/index';
import  utils from '../../utils/utils';
const { Option } = Select;
const FormItem = Form.Item;

export default class City extends React.Component{
    state = {
        isShowOpenCity:false
    }
    params = {
        page:1
    }
    componentDidMount(){
       this.requestList();
    }

    // 默认请求我们接口的数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url:'city/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res) => {
            console.log(res);
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;    
            });
            this.setState({
                list:list,
                pagination:utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    // 开通城市
    handelOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }
    //城市开通提交
    handelSubmit = () => {
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo)
        axios.ajax({
            url:"city/open",
            data:{
                params:cityInfo
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success(res.result);
                this.setState({
                    isShowOpenCity:false
                })
            }
        })
    }
    render(){
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },
            {
                title:'城市名称',
                dataIndex:'name'
            },
            {
                title:'用车模式',
                dataIndex:'mode',
                render(mode){
                    return mode ===1?'停车点':'禁停区'
                }
            },
            {
                title:'运营模式',
                dataIndex:'op_mode',
                render(op_mode){
                    return op_mode ===1?'自营':'加盟 '
                }
            },  
            {
                title:'授权加盟商',
                dataIndex:'franchisee_name'
            },
            {
                title:'城市管理员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title:'城市开通时间',
                dataIndex:'open_time',
            },  
            {
                title:'操作时间',
                dataIndex:'update_time',
                render:utils.formateDate
            },  
            {
                title:'操作人',
                dataIndex:'sys_user_name'
            },  
        ]
        return(
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style = {{marginTop:10}}>
                    <Button type = 'primary' onClick = { this.handelOpenCity }>开通城市</Button>
                </Card>
                <div className = 'content-wrap'>
                    <Table
                    bordered
                    columns = { columns }
                    dataSource = { this.state.list }
                    pagination = { this.state.pagination }
                    />
                </div>
                <Modal
                title = '开通城市'
                visible = { this.state.isShowOpenCity }
                onCancel = {() => {
                    this.setState({
                        isShowOpenCity:false
                    })
                }}
                onOk ={ this.handelSubmit } 
                >
                    <OpenCityForm wrappedComponentRef = {(inst) => { this.cityForm = inst }}/>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends React.Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout = 'inline'>
                <FormItem label = '城市'>
                    {
                        getFieldDecorator('city_id')(
                            <Select
                            style = {{width:80}}
                            placeholder = '全部'
                            >
                                <Option value = ''>全部</Option>
                                <Option value = '1'>北京市</Option>
                                <Option value = '2'>天津市</Option>
                                <Option value = '3'>深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label = '用车模式'>
                    {
                        getFieldDecorator('mode')(
                            <Select
                            style = {{width:125}}
                            placeholder = '全部'
                            >
                                <Option value = ''>全部</Option>
                                <Option value = '1'>指定停车点模式</Option>
                                <Option value = '2'>禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label = '运营模式'>
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                            style = {{width:80}}
                            placeholder = '全部'
                            >
                                <Option value = ''>全部</Option>
                                <Option value = '1'>自营</Option>
                                <Option value = '2'>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label = '加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                            style = {{width:80}}
                            placeholder = '全部'
                            >
                                <Option value = ''>全部</Option>
                                <Option value = '2'>已授权</Option>
                                <Option value = '3'>未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type = 'primary' style = {{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

FilterForm = Form.create({})(FilterForm);


class OpenCityForm extends React.Component{
    render(){
        const fromItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            } 
        }
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout = 'horizontal'> 
                <FormItem label = '选择城市' {...fromItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select style = {{width:100}}>
                                <Option value = ''>全部</Option>
                                <Option value = '1'>北京市</Option>
                                <Option value = '2'>天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label = '运营模式'  {...fromItemLayout}>
                {
                        getFieldDecorator('op_mode',{
                            initialValue:'1'
                        })(
                            <Select style = {{width:100}}>
                                <Option value = '1'>自营</Option>
                                <Option value = '2'>加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label = '用车模式'  {...fromItemLayout}>
                {
                        getFieldDecorator('use_mode',{
                            initialValue:'1'
                        })(
                            <Select style = {{width:100}}>
                                <Option value = '1'>指定停车点</Option>
                                <Option value = '2'>禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);