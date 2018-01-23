/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import Fluxible from 'fluxible';
import DemoStore from "../app/Demo.store.js";

const app = new Fluxible({
    component: require('../app/Router'),
    stores: [
        DemoStore
    ]
});
app.uid = "demoApp";
module.exports = app;
