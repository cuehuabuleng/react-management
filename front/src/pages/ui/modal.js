import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';
export default class Modals extends React.Component{

    state = {
        showmodal1:false,
        showmodal2:false,
        showmodal3:false,
        showmodal4:false,
    }
    handelClickopendModal = (type) => {
        this.setState({
            [type]:true
        })
    }

    handelConfirm = (type) => {
        Modal[type]({
            title:'确定？',
            content:'你确定学会了react了吗？',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }

    render(){
        return(
            <div>
                <Card title = '基础模态框' className = 'card-wrap'>
                    <Button type = 'primary' onClick = { () => this.handelClickopendModal('showmodal1') }>opend</Button>
                    <Button type = 'primary' onClick = { () => this.handelClickopendModal('showmodal2') }>自定义页脚</Button>
                    <Button type = 'primary' onClick = { () => this.handelClickopendModal('showmodal3') }>顶部20px弹框</Button>
                    <Button  type = 'primary' onClick = { () => this.handelClickopendModal('showmodal4') }>水平垂直居中</Button>
                </Card>
                <Card title = '信息确认框' className = 'card-wrap'>
                    <Button type = 'primary' onClick = { () => this.handelConfirm('confirm') }>confirm</Button>
                    <Button type = 'primary' onClick = { () => this.handelConfirm('info') }>info</Button>
                    <Button type = 'primary' onClick = { () => this.handelConfirm('success') }>success</Button>
                    <Button  type = 'primary' onClick = { () => this.handelConfirm('warning') }>warning</Button>
                </Card>

                <Modal
                title = 'react'
                visible = {this.state.showmodal1}
                onCancel = { () => {
                    this.setState({
                        showmodal1:false
                    })
                }} 
                >
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>

                <Modal
                title = 'react'
                visible = {this.state.showmodal2}
                okText = '好的'
                cancelText = '算了'
                onCancel = { () => {
                    this.setState({
                        showmodal2:false
                    })
                }} 
                >
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>

                <Modal
                title = 'react'
                style = {{ top : 20}}
                visible = {this.state.showmodal3}
                onCancel = { () => {
                    this.setState({
                        showmodal3:false
                    })
                }} 
                >
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>

                <Modal
                title = 'react'
                wrapClassName = 'vertical-center-modal'
                visible = {this.state.showmodal4}
                onCancel = { () => {
                    this.setState({
                        showmodal4:false
                    })
                }} 
                >
                    <p>欢迎学习慕课新推出的react高级课程</p>
                </Modal>
            </div>
        )
    }
}
