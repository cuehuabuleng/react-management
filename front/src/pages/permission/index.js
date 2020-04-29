import React from 'react';
import { Card, Button, Modal, Input, Select, Form, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable';
import utils from './../../utils/utils';
import axios from './../../axios/index';
import menuConfig from './../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const { TreeNode } = Tree;
export default class Pemission extends React.Component{

    state = {}
    componentWillMount(){
        axios.requestList(this, '/role/list', {});
    }

    //打开创建角色
    handleRole = () => {
        this.setState({
            isRoleVisible:true
        })
    }
    // 角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/role/create',
            data:{
                params:data
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    isRoleVisible:false
                })
                axios.requestList(this, '/role/list', {});
                this.roleForm.props.form.resetFields();
            }
        })
    }

    // 权限设置
    handlePermission =() => {
        let item = this.state.selectItem;
        console.log(item)
        if (!item) {
            Modal.info({
                title:'信息',
                content:'请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermisVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })
    }

    // 权限设置提交
    handlePermEditSubmit =() => {
        let data = this.permForm.props.form.getFieldsValue();
        data.role_id = this.state.selectItem.id;
        data.mune = this.state.menuInfo;
        console.log(this.state.menuInfo)
        axios.ajax({
            url:'role/permission/edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isPermisVisible:false
                })
                axios.requestList(this, '/role/list', {});
            }
        })

    }

    // 用户授权
    handelUserAuth = () => {
        let item = this.state.selectItem;
        if (!item) {
            Modal.info({
                title:'信息',
                content:'请选择一个角色'
            })
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
        this.getRoleUserList(item);

    }

    getRoleUserList = (id) => {
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res) => {
            if (res) {
                this.getAuthUserList(res.result);
            }
        })
    }

    // 筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length>0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status:dataSource[i].status
                }
                if (data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                targetKeys,
                mockData
            })
        }
    }

    // 用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys;
        data.role_id = this.state.selectItem.id;
        console.log(data)
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isUserVisible:false
                })
                axios.requestList(this, '/role/list', {});
            }
        })
    }

    render(){
        const  columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            },
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:utils.formateDate
            },
            {
                title:'使用状态',
                dataIndex:'status',
                render(status){
                    return status === 1 ? '启用' : '停用'
                }
            },
            {
                title:'授权时间',
                dataIndex:'authorize_time',
                render:utils.formateDate
            },
            {
                title:'授权人',
                dataIndex:'authorize_user_name'
            },
        ]
        return(
            <div>
               <Card>
                   <Button type = 'primary'  onClick = { this.handleRole }>创建角色</Button>
                   <Button type = 'primary' style = {{ marginLeft:10,marginRight:10}} onClick = { this.handlePermission }>设置权限</Button>
                   <Button type = 'primary' onClick = { this.handelUserAuth }>用户授权</Button>
               </Card>
               <div className = 'content-wrap'>
                   <ETable 
                    columns = { columns }
                    dataSource = { this.state.list }
                    updateSelectedItem = { utils.updateSelectItem.bind(this) }
                    selectedRowKeys = { this.state.selectedRowKeys }
                    />
               </div>

               {/* 创建角色弹框 */}
               <Modal
                    title = '创建角色'
                    visible = { this.state.isRoleVisible }
                    onOk = { this.handleRoleSubmit}
                    onCancel = { () => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
               >
                   <RoleForm wrappedComponentRef = { (inst) => {this.roleForm = inst} }/>
               </Modal>

               {/* 权限设置弹框 */}
               <Modal
                    title='设置权限'
                    visible = { this.state.isPermisVisible }
                    width = { 600 }
                    onOk = { this.handlePermEditSubmit }
                    onCancel = {() => {
                        this.setState({
                            isPermisVisible:false
                        })
                    }}
               >
                   <PermEditForm 
                        wrappedComponentRef = { (inst) => { this.permForm = inst }}
                        detailInfo = { this.state.detailInfo }
                        menuInfo ={ this.state.menuInfo }
                        patchMenuInfo = {(checkedKeys) => {
                            this.setState({
                                    menuInfo:checkedKeys
                            })
                        }} 
                   />
               </Modal>

               {/* 用户授权弹框 */}
               <Modal
                    title='用户授权'
                    visible = { this.state.isUserVisible }
                    width = { 800 }
                    onOk = { this.handleUserSubmit }
                    onCancel = {() => {
                        this.setState({
                            isUserVisible:false
                        })
                    }}
               >
                    <RoleAuthForm 
                        wrappedComponentRef = { (inst) => { this.userAuthForm = inst }}
                        detailInfo = { this.state.detailInfo }
                        targetKeys ={ this.state.targetKeys }
                        mockData ={ this.state.mockData }
                        patchUserInfo = {(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                   />
               </Modal>
            </div>
        )
    }
}

// 创建角色表单

class RoleForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}

RoleForm = Form.create({})(RoleForm);

//  设置权限表单
class PermEditForm extends React.Component{
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title = { item.title } key = { item.key }>
                    { this.renderTreeNodes(item.children ) }
                </TreeNode>
            }else{
                return <TreeNode title = { item.title } key = { item.key }></TreeNode>
            }
        })
    }

    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const detai_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout = 'horizontal'>
                <FormItem label = '角色名称' { ...formItemLayout }>
                    <Input disabled placeholder = { detai_info.role_name }/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue:detai_info.status
                        })(
                            <Select>
                                <Option value = {1}>开启</Option>
                                <Option value = {0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck = { (checkedKeys) => {
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys ={ menuInfo }
                >
                   <TreeNode title = '平台权限' key = 'platform_all'>
                         { this.renderTreeNodes(menuConfig) }
                   </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm);

// 用户授权表单
class RoleAuthForm extends React.Component{
    
    filterOption = (inputValue, option) =>{
       return option.title.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    }

    render(){
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const detai_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout = 'horizontal'>
                <FormItem label = '角色名称' { ...formItemLayout }>
                    <Input disabled placeholder = { detai_info.role_name }/>
                </FormItem>
                <FormItem label = '选择用户' { ...formItemLayout }>
                    <Transfer
                        listStyle = {{ width:200, height:400 }}
                        dataSource = { this.props.mockData }
                        title = {['待选用户','已选用户']}
                        showSearch
                        searchPlaceholder = '输入用户名字' 
                        filterOption={ this.filterOption }
                        targetKeys = { this.props.targetKeys }
                        onChange = { this.handleChange }
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);