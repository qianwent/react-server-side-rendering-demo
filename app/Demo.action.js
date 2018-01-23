/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */
import DemoService from "./Demo.service.js";

class DemoAction {

    /**
     * @param  {string} text
     */
    static loadData(actionContext, payload, done) {
        DemoService.loadData(payload, function (data) {
            console.log('loading data...');
            actionContext.dispatch('LOAD_DATA', data);
            done && done();
        });
    }


}

export default  DemoAction;