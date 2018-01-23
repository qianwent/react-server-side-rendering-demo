/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import app from './app';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import createElement from 'fluxible-addons-react/createElementWithContext';
import Router from 'react-router';
import setimmediate from 'setimmediate';


export default class ClientRender {
    constructor(routes) {
        this.routes = routes;
    }


    render() {
        var dehydratedState = window.App;
        app.rehydrate(dehydratedState, function (err, context) {

            if (err) {
                throw err;
            }

            window.context = context;

            var mountNode = document.getElementById(app.uid);
            Router.run(app.getComponent(), Router.HistoryLocation, function (Handler, state) {
                var Component = React.createFactory(Handler);
                React.render(
                    React.createElement(
                        FluxibleComponent,
                        {context: context.getComponentContext()},
                        Component()
                    ),
                    mountNode,
                    function () {
                    }
                );
            });
        });
    }
};


new ClientRender().render();