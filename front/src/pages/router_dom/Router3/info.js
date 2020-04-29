import React from 'react';
export default class Info extends React.Component{
    render(){
        return(
            <div>
                这里是测试动态路由的功能
                <br/>
                动态路由的值是：
                {this.props.match.params.Id}
            </div>
        )
    }
}