import React, { Component }  from 'react';
import './index.less';
export default class Demo extends Component {
    render(){
        return(
            <div className = 'wrapper'>
                点击我
                <button className  = 'handelClick'>点击我</button>
            </div>
        )
    }
}