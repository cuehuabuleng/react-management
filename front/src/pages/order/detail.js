import React from 'react';
import { Card } from 'antd';
import './detail.less';
import axios from './../../axios/index';
import BMap from 'BMap';
export default class OrderDetail extends React.Component{
    state = {

    }

    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }

    getDetailInfo = (orderId) => {
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res) => {
                if (res.code === 0) {
                    this.setState({
                        orderInfo:res.result
                    })
                }
                this.renderMap(res.result);
        })
    }

    renderMap = (result) => {
        this.map = new BMap.Map('orderDetailMap');
        
        // 添加地图控件   
        this.addMapControl();
        // 调用路线图绘制方法
        this.drawBikeRoute(result.position_list);
        // 调用绘制服务区方法
        this.drawServerviceArea(result.area);

    }
    addMapControl = () => {
        let map = this.map;
        map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
        map.addControl(new BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_LEFT})); //比例尺
         map.addControl(new BMap.NavigationControl());   //平移缩放控件
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }
    // 绘制用户的行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let first = positionList[0];
            let last = positionList[positionList.length-1]

            startPoint =  new BMap.Point(first.lon, first.lat);
            let startIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36,42),{
                imageSize:new BMap.Size(36,42),
                anchor: new BMap.Size(36,42)
            });
            let startMarker = new BMap.Marker(startPoint, { icon: startIcon });
            map.addOverlay(startMarker);

            endPoint =  new BMap.Point(last.lon, last.lat);
            let endIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36,42),{
                imageSize:new BMap.Size(36,42),
                anchor: new BMap.Size(36,42)
            });
            let endMarker = new BMap.Marker(endPoint, { icon: endIcon });
            map.addOverlay(endMarker);

            // 连接路线图片
            let trakPoint = [];
            for (let i = 0; i < positionList.length; i++) {
                let point = positionList[i];
                trakPoint.push(new BMap.Point(point.lon, point.lat));
            }

            let polyline = new BMap.Polyline(trakPoint, {
                strokeColor:'#1869AD',
                strokeWeight:3,
                strokeOpacity:1
            })
            map.addOverlay(polyline);
            map.centerAndZoom(endPoint, 11)
        }

    }

    // 绘制服务区
    drawServerviceArea = (positionList) => {
        let map = this.map;
        let trackPoint  = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new BMap.Polygon(trackPoint, {
            strokeColor:'#CE0000',
            strokeWeight:4,
            strokeOpacity:1,
            fillColor:'#ff8605',
            fillOpacity:0.4
        })
        map.addOverlay(polygon)

    }
    render(){
        const info = this.state.orderInfo || {};
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className = 'order-map'></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{ info.mode === 1 ? '服务区':'停车点' }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{ info.order_sn }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{ info.bike_sn }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{ info.user_name }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{ info.mobile }</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{ info.start_location }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{ info.end_location }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{ info.distance/1000 }公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}