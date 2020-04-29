import React from 'react';
import axios from './../../axios/index';
import FilterForm from './../../components/BaseForm';
import { Card } from 'antd';
import BMap from 'BMap';

export default class bikeMap extends React.Component{

    formList = [
        {
            type:'城市',
            width:80
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            initialValue:'0',
            list:[{id:'0', name:'全部'}, {id:'1', name:'进行中'}, {id:'2', name:'行程结束'}],
            width: 120
        },
    ]

    state = {}
    params = {}
    map = ''
    requestList = () => {
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }

    //查询表单
    handelFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }

    // 渲染地图数据
    renderMap = (res) => {
        let list = res.result.route_list;
        this.map =new BMap.Map('contaner');
        let gps1 = list[0].split(',');
        let  startPoint = new BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint,11);

        let startPointIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36, 42),{
            imageSize:new BMap.Size(36, 42),
            anchor:new BMap.Size(18, 42)
        })
        let bikeMarkStart =new BMap.Marker(startPoint, { icon: startPointIcon});
        this.map.addOverlay(bikeMarkStart);


        let endPointIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36, 42),{
            imageSize:new BMap.Size(36, 42),
            anchor:new BMap.Size(18, 42)
        })
        let bikeMarkEnd =new BMap.Marker(endPoint, { icon: endPointIcon});
        this.map.addOverlay(bikeMarkEnd);

        // 绘制车辆行驶路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new BMap.Point(p[0], p[1]))
        });
        let polyLine = new BMap.Polyline(routeList, {
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);

        //  绘制服务区
        let servicePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item) => {
            servicePointList.push(new BMap.Point(item.lon, item.lat))
        })
        let polyServiceLine = new BMap.Polyline(servicePointList, {
            strokeColor:'#ef4136',
            strokeWeight:4,
            strokeOpacity:1
        })
        this.map.addOverlay(polyServiceLine);

        //  添加图中的自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new BMap.Icon('/assets/bike.jpg', new BMap.Size(36, 42), {
            imageSize:new BMap.Size(36, 42),
            anchor:new BMap.Size(18, 42)
        })
        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new BMap.Point(p[0], p[1]);
            let bikeMarker = new BMap.Marker(point, { icon:bikeIcon })
            this.map.addOverlay(bikeMarker);
        })
    }

    componentWillMount(){
        this.requestList();
    }

    render(){
        return(
            <div>
                <Card>
                    <FilterForm formList = { this.formList } filterSubmit = { this.handelFilterSubmit }/>
                </Card>
                <Card style = {{ marginTop:10}}>
                     <div>共{ this.state.total_count }辆车</div>
                     <div id = 'contaner' style = {{ height:'80vh'}}></div>
                </Card>
            </div>
        )
    }
}