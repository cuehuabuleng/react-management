import React from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';
export default class Carousels extends React.Component{
    render(){
        return(
            <div>
                <Card title = '文字背景轮播' className = 'card-wrap'>
                    <Carousel
                    autoplay = { true }
                    effect = 'fade'
                    >
                        <div className=""><h3>chenwenjie</h3></div>
                        <div className=""><h3>陈文杰 </h3></div>
                        <div className=""><h3>沉稳 </h3></div>
                    </Carousel>
                </Card>

                <Card title = '图片背景轮播' className = 'slider-wrap'>
                    <Carousel
                    autoplay = { true }
                    effect = 'fade'
                    >
                        <div className="">
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div className="">
                            <img src="carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div className="">
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}