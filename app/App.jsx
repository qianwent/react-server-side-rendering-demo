/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import Router from 'react-router';
import {connectToStores, provideContext} from 'fluxible-addons-react';
var {RouteHandler} = Router;


@provideContext class App extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="main-container">
                <RouteHandler {...this.props}/>
            </div>
        );
    }


}

export default App;