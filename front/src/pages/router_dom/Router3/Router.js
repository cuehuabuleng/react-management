import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import About from '../router_1/about';
import Info from './info';
import Topics from '../router_1/topics';
import Home from './home';
import Nomatch from './Nomatch';
export default class IRouter extends React.Component{
    render(){
        return(
            <Router>
                    <Home>
                        <Switch>
                            <Route  path = '/main' render = { () => 
                            <Main>
                                <Route path = '/main/:Id' component = { Info }></Route>
                            </Main>
                            } ></Route>
                            <Route path = '/about' component = { About }></Route>
                            <Route path = '/topics' component = { Topics }></Route>
                            <Route component = { Nomatch }></Route>
                        </Switch>
                    </Home>
            </Router>
        )
    }
}