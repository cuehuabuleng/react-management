import React from 'react';
import { Card, Button, Radio, notification } from 'antd';

export default class Notice extends React.Component{

    opendNotification = (type, derection) => {
        if (derection) {
            notification.config({
                placement:derection
            })
        }
        notification[type]({
            message:'发工资啦',
            description:'上个月考勤22天，迟到12天，实发250元'
        })
    }

    render(){
        return(
            <div>
                <Card title = '通知提醒' className = 'card-wrap'>
                    <Button type = 'primary' onClick = { () => this.opendNotification('success') }>Success</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('info') }>Info</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('warning') }>Warning</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('error') }>Error</Button>
                </Card>

                <Card title = '通知提醒' className = 'card-wrap'>
                    <Button type = 'primary' onClick = { () => this.opendNotification('success','topLeft') }>Success</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('info','topRight') }>Info</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('warning', 'bottomLeft ') }>Warning</Button>
                    <Button type = 'primary' onClick = { () => this.opendNotification('error','bottomRight') }>Error</Button>
                </Card>
            </div>
        )
    }
}