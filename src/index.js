import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/styles.css'
import UsersPage from "./Pages/UsersPage";
import CurrencyPage from "./Pages/CurrencyPage";
import CityPage from "./Pages/CityPage";
import NavbarComponent from "./Components/NavbarComponent";
import {HashRouter, Route, Link, BrowserRouter as Router, NavLink} from 'react-router-dom'
import TimeZonePage from "./Pages/TimeZonePage";
import CountryPage from "./Pages/CountryPage";
import SuggestionPage from "./Pages/SuggestionPage";
import StatisticsPage from "./Pages/StatisticsPage";


const routing = (
    <div className="contentDiv">
        <HashRouter>
                <NavbarComponent/>
                <Route path="/users" component={UsersPage} />
                <Route path="/city" component={CityPage} />
                <Route path="/currency" component={CurrencyPage} />
                <Route path="/timezone" component={TimeZonePage} />
                <Route path="/country" component={CountryPage} />
                <Route path="/suggestion" component={SuggestionPage} />
                <Route path="/statistics" component={StatisticsPage} />

        </HashRouter>
    </div>


);

ReactDOM.render(routing, document.getElementById('root'));
