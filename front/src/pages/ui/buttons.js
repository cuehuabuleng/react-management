import React from 'react';
import { Card, Button, Icon, Radio } from 'antd';
import './ui.less';
export default class Buttons extends React.Component{

    state = {
        loading:true,
        size:'default'
    }

    handelClickstoploading = () =>{
        this.setState({
            loading:false
        })
    }

    handelChangesize = (e) => {
        this.setState({
            size:e.target.value
        })
    }

    render(){
        return(
            <div>
                <Card title = '基础按钮' className = 'card-wrap'>
                    <Button type = 'primary'>Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type = 'dashed'>Imooc</Button>
                    <Button type = 'danger'>Imooc</Button>
                    <Button disabled>Imooc</Button>                    
                </Card>
                <Card title = '图形按钮' className = 'card-wrap'>
                    <Button icon = 'plus'>创建</Button>
                    <Button icon = 'edit'>编辑</Button>
                    <Button icon = 'delete'>删除</Button>
                    <Button shape = 'circle' icon = 'search'></Button>
                    <Button type = 'primary' icon = 'search'>搜索</Button>
                    <Button type = 'primary' icon = 'download'>下载</Button>                    
                </Card>
                <Card title = 'loading按钮' className = 'card-wrap'>
                    <Button type = 'primary' loading = { this.state.loading }>确定</Button>
                    <Button shape = 'circle' loading = { this.state.loading }></Button>
                    <Button loading = { this.state.loading }>点击加载</Button>
                    <Button shape = 'circle' loading = { this.state.loading }></Button>
                    <Button type = 'primary' onClick = { this.handelClickstoploading }>关闭</Button>                
                </Card>
                <Card title = '按钮组'  style = {{marginBottom:10}} >
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left" />
                            前进
                        </Button>
                        <Button type="primary">
                            后退
                            <Icon type="right" />
                        </Button>
                    </Button.Group>
                </Card>
                <Card title = '尺寸按钮' className = 'card-wrap'>
                    <Radio.Group onChange = { this.handelChangesize } >
                        <Radio value = 'small'>大</Radio>
                        <Radio value = 'default'>中</Radio>
                        <Radio value = 'large'>小</Radio>
                    </Radio.Group>
                    <Button type = 'primary' size = { this.state.size }>Imooc</Button>
                    <Button size = { this.state.size }>Imooc</Button>
                    <Button type = 'dashed' size = { this.state.size }>Imooc</Button>
                    <Button type = 'danger' size = { this.state.size }>Imooc</Button>
                    <Button disabled size = { this.state.size }>Imooc</Button>                    
                </Card>
            </div>
        )
    }
}