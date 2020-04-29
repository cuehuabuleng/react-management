import React from 'react';
import { Card, Row, Col, Modal } from 'antd';
export default class Gallery extends React.Component{

    state ={
        visible:false
    }
    opendGallery = (item) => {
        this.setState({
            opendimgurl:'/gallery/'+item,
            visible:true
        })
    }

    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png'],
        ]
        const imgList = imgs.map((list) => list.map((item) =>
        <Card 
        onClick = { () => this.opendGallery(item) }
        style = {{ marginBottom:10 }}
            cover = { <img src = { '/gallery/'+item}/> }
        >
            <Card.Meta
                    title = 'React Admin'
                    description = 'i love y'
            />
        </Card>
        ))
        return(
            <div>
                <Row gutter = { 10 }>
                   <Col span = {5}>
                       { imgList[0] }
                   </Col>
                   <Col span = {5}>
                       { imgList[1] }
                   </Col>
                   <Col span = {5}>
                       { imgList[2] }
                         </Col>
                   <Col span = {5}>
                        { imgList[3] }
                   </Col>
                   <Col span = {4}>
                        { imgList[4] }
                   </Col>
                </Row>
                <Modal
                width = { 500 }
                visible = { this.state.visible }
                title = '图片预览'
                footer = { null }
                onCancel = { () => {
                    this.setState({
                        visible:false
                    })
                }}
                >
                    <img src= { this.state.opendimgurl} alt="" style = {{ width:'100%' }}/>
                </Modal>
            </div>
        )
    }
}