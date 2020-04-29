import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import APP from './App';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modal';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Message from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import Formlogin from './pages/from/login';
import Fromregister from './pages/from/register';
import BasicTable from './pages/table/basicTable';
import HightTable from './pages/table/hightTable';
import City from './pages/city';
import Order from './pages/order/index';
import OrderDetail from './pages/order/detail';
import User from './pages/user/index';
import Pemission from './pages/permission/index';
import bikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich/index';
import Login from './pages/login';
import Home from './pages/home/index';
import Common from './common';
import Nomatch from './pages/nomatch/index';
export default class Router extends React.Component{
    render(){
        return(
            <HashRouter>
                <APP>
                    <Switch>
                        <Route path = '/login' component = { Login }></Route>
                        <Route path = '/common' render = {() => 
                            <Common>
                                <Route path = '/common/order/detail/:orderId' component = { OrderDetail } /> 
                            </Common>
                        }>
                        </Route>
                        <Route path = '/' render = { () =>
                            <Admin>
                                <Switch>
                                    <Route exact = {true} path = '/home' component = { Home }></Route>
                                    <Route exact = {true} path = '/ui/buttons' component = { Buttons }></Route>
                                    <Route exact = {true} path = '/ui/modals' component = { Modals }></Route>
                                    <Route exact = {true} path = '/ui/loadings' component = { Loadings }></Route>
                                    <Route exact = {true} path = '/ui/notification' component = { Notice }></Route>
                                    <Route exact = {true} path = '/ui/messages' component = { Message }></Route>
                                    <Route exact = {true} path = '/ui/tabs' component = { Tab }></Route>
                                    <Route exact = {true} path = '/ui/gallery' component = { Gallery }></Route>
                                    <Route exact = {true} path = '/ui/carousel' component = { Carousels }></Route>
                                    <Route exact = {true} path = '/form/login' component = { Formlogin }></Route>
                                    <Route exact = {true} path = '/form/reg' component = { Fromregister }></Route>
                                    <Route exact = {true} path = '/table/basic' component = { BasicTable }></Route>
                                    <Route exact = {true} path = '/table/high' component = { HightTable }></Route>
                                    <Route exact = {true} path = '/city' component = { City }></Route>
                                    <Route exact = {true} path = '/order' component = { Order }></Route>
                                    <Route exact = {true} path = '/user' component = { User }></Route>
                                    <Route exact = {true} path = '/bikeMap' component = { bikeMap }></Route>
                                    <Route exact = {true} path = '/permission' component = { Pemission }></Route>
                                    <Route exact = {true} path = '/permission' component = { Pemission }></Route>
                                    <Route exact = {true} path = '/charts/bar' component = { Bar }></Route>
                                    <Route exact = {true} path = '/charts/pie' component = { Pie }></Route>
                                    <Route exact = {true} path = '/charts/line' component = { Line }></Route>
                                    <Route exact = {true} path = '/rich' component = { Rich }></Route>
                                    <Redirect to = '/home'/>
                                    <Route component = { Nomatch }></Route>
                                </Switch>
                            </Admin>
                        }></Route>    
                    </Switch>                
                </APP>
            </HashRouter>
        );
    }
}