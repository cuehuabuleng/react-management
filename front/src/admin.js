import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header/index';
import Footer from './components/Footer/index';
import Navleft from './components/NavLeft/index';
import Home from './pages/home/index';
import './style/commom.less';
export default class Admin extends Component{
    render(){
        return(
            <div>
                <Row className = 'container'>
                    <Col span={3} className ='nav-left'>
                        <Navleft/>       
                    </Col>
                    <Col span={21} className = 'main'>
                        <Header/>
                        <Row className = 'content'>
                            { this.props.children }
                        </Row>
                        <Footer/>
                    </Col>
                 </Row>
            </div>
        )
    }
}