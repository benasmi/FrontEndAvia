import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/styles.css'
import UsersPage from "./Pages/UsersPage";
import CurrencyPage from "./Pages/CurrencyPage";
import Navbar from "./Components/Navbar";

import {HashRouter, Route, Link, BrowserRouter as Router, NavLink} from 'react-router-dom'


const routing = (
    <HashRouter>
        <div className="routerDiv">
            <Navbar/>
        </div>

        <div className="contentDiv">
            <Route exact path="/" component={App} />
            <Route path="/users" component={UsersPage} />
            <Route path="/currencies" component={CurrencyPage} />
        </div>
    </HashRouter>
)

ReactDOM.render(routing, document.getElementById('root'));
