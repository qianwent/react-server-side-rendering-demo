/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import Router from "react-router";
import async from "async";
import app from "./app.js";
import Html from "../app/Html.jsx";
import Lodash from "lodash";
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createElement from 'fluxible-addons-react/createElementWithContext';
import serialize from "serialize-javascript";
import DemoAction from "../app/Demo.action";

export default class ServerRender {
    constructor() {
        this.actions = [/*这里可以加入一些全局的初始化 Aciton*/];
    }

    render(req, res) {
        var context = app.createContext({
            api: process.env.API || 'https://api.spotify.com/v1',
            env: {
                NODE_ENV: process.env.NODE_ENV
            }
        });
        var actions = this.actions || [];
        Router.run(app.getComponent(), req.url, function (Handler, state) {
            if (state.routes.length === 0) {
                res.status(404);
            }
            async.filterSeries(
                state.routes.filter(function (route) {
                    return route.handler.loadAction ? true : false;
                }),
                function (route, done) {
                    async.map(actions.concat(route.handler.loadAction), function (action, callback) {
                        context.getActionContext().executeAction(action, {
                            form: Lodash.merge(state.params, state.query),
                            params: Lodash.extend({}, state.params),
                            query: Lodash.extend({}, state.query),
                            req: Lodash.extend({}, req),
                            res: Lodash.extend({}, res),
                            state: Lodash.extend({}, state),
                            route: Lodash.extend({}, route)
                        }, callback);
                        //在 Server Side 执行 Action 的时候，传入一些 App 上下文参数
                    }, function (err, result) {
                        done();
                    });
                },
                function () {

                    const state = "window.App=" + serialize(app.dehydrate(context)) + ";";
                    var Component = React.createFactory(Handler);
                    var HtmlComponent = React.createFactory(Html);

                    var markup = React.renderToString(
                        React.createElement(
                            FluxibleComponent,
                            {context: context.getComponentContext()},
                            Component()
                        ));

                    var html = React.renderToStaticMarkup(HtmlComponent({
                        context: context.getComponentContext(),
                        state: state,
                        uid: app.uid,
                        markup: markup
                    }));
                    res.send(html);
                }
            );
        });
    }

}
