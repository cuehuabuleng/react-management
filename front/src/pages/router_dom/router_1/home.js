import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Main from './Main';
import About from './about';
import Topics from './topics';
export default class Home extends React.Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to = '/'>Home</Link>
                        </li>
                        <li>
                            <Link to = '/About'>About</Link>
                        </li>
                        <li>
                            <Link to = '/Topics'>Topics</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Route path = '/' exact = { true  } component = { Main }></Route>
                    <Route path = '/About' component = { About }></Route>
                    <Route path = '/Topics' component = { Topics }></Route>
                </div>
            </HashRouter>
        )
    }
}