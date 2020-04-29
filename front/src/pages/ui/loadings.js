import React from 'react';
import { Card, Button, Spin, Icon, Alert } from 'antd';
import './ui.less';
export default class Loadings extends React.Component{
    render(){
        const iconloading = <Icon type = 'loading' style = {{ fontSize:25}}/>
        return(
            <div>
                <Card title = 'spin的用法' className = 'card-wrap '>
                    <Spin size = 'small'/>
                    <Spin size = "default" style = {{ margin:'0 10px'}}/>
                    <Spin size = 'large'/>
                    <Spin indicator = { iconloading } style = {{ marginLeft: 10}}/>
                </Card>

                <Card title = '内容遮罩' className = 'card-wrap '>
                    <Alert
                        message = 'React'
                        description = '欢来到react高级课程'
                        type = 'info'
                    />
                    <Spin>
                        <Alert
                            message = 'React'
                            description = '欢来到react高级课程'
                            type = 'warning'
                        />
                    </Spin>

                    <Spin tip = '加载中。。。。'>
                        <Alert
                            message = 'React'
                            description = '欢来到react高级课程'
                            type = 'warning'
                        />
                    </Spin>

                    <Spin indicator = { iconloading }>
                        <Alert
                            message = 'React'
                            description = '欢来到react高级课程'
                            type = 'warning'
                        />
                    </Spin>

                </Card>
            </div>
        )
    }
}