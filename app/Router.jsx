/**
 * Created by kin on 15/8/24.
 */

import React from 'react';
import Router from 'react-router';
import App from "./App.jsx"
import PageNotFound from "./PageNotFound.page.jsx"
import Demo from './Demo.page.jsx'
import StyleCss from "../static/css/style.css";
import Favicon from "file?name=[name].[ext]!../static/favicon.ico";
// polyfill
if (!Object.assign)
    Object.assign = React.__spread; // eslint-disable-line no-underscore-dangle

var {
    Route,
    DefaultRoute,
    NotFoundRoute,
    RouteHandler,
    Link
    } = Router;

module.exports = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Demo}/>
        <NotFoundRoute handler={PageNotFound}/>
    </Route>
);
