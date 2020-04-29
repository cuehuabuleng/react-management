import React, { Component } from 'react';
import menuList from '../../config/menuConfig.js';
import './index.less';
import { Menu, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import  {switchMenu}  from './../../redux/action/index'; 
const { SubMenu } = Menu;
class Navleft extends Component{
    state = {
        currentKey:''
    }

    handelClick = ({item, key}) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title));
        console.log(item.props.title)
        this.setState({
            currentKey:key
        })
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuList);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        console.log(currentKey)
        this.setState({
            menuTreeNode,
            currentKey
        })
    }

    renderMenu = (data) => {
        return data.map((item) => {
            if(item.children){
                return(
                    <SubMenu title = { item.title} key = { item.key }>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item key = { item.key } title = { item.title } >
            <NavLink to = { item.key }>{ item.title }</NavLink>
            </Menu.Item>
        })
    }


    render(){
        return(
            <div>
                <div className = 'logo'> 
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>后台管理系统</h1>
                </div>
                <Menu
                 onClick = { this.handelClick }
                 selectedKeys = { [this.state.currentKey] }
                 theme = "dark">
                    {
                        this.state.menuTreeNode
                    }
                </Menu>
            </div>
        )
    }
}

export default connect()(Navleft);