import React from 'react';
import { Card, Button, Icon, Radio, message } from 'antd';
import './ui.less';
export default class Message extends React.Component{

    showMessage = (type) => {
        message[type]("恭喜你， react课程已经晋级成功", 1);
    }

    render(){
        return(
            <div>
                <Card title = '全局提示' className = 'card-wrap'>
                    <Button type = 'primary' onClick = { () => this.showMessage('success') }>success</Button>
                    <Button type = 'primary' onClick = { () => this.showMessage('info') }>info</Button>
                    <Button type = 'primary' onClick = { () => this.showMessage('warning') }>warning</Button>
                    <Button type = 'primary' onClick = { () => this.showMessage('error') }>error</Button>
                    <Button type = 'primary' onClick = { () => this.showMessage('loading') }>loading</Button>
                </Card>
            </div>
        )
    }
}