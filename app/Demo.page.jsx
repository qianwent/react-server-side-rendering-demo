/**
 * Created by kin on 15/10/18.
 */

import React from 'react';
import DemoStore from "Demo.store.js";
import DemoAction from "Demo.action.js";

import { connectToStores } from 'fluxible-addons-react';
@connectToStores([DemoStore], (context) => ({
    DemoStore: context.getStore(DemoStore).getState()
})) class Demo extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func,
        executeAction: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    reload() {
        this.context.executeAction(DemoAction.loadData, {});
    }

    /**
     * @return {object}
     */
    render() {
        console.info(this.props.DemoStore);
        var data = this.props.DemoStore.data || [];
        var itemContent = data.map(function (item, i) {
            return (<p>{item.content}</p>);
        });
        return (
            <div>
                {itemContent}
                <div className="align-center">
                    <a className="button" onClick={this.reload.bind(this)}>Reload</a>
                </div>
            </div>
        );
    }


}

Demo.loadAction = [DemoAction.loadData];

export default Demo;

