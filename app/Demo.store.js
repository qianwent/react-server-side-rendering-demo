/**
 * Created by kin on 15/8/13.
 */
import BaseStore from 'fluxible/addons/BaseStore';
var CHANGE_EVENT = 'change';


class DemoStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
        this.data = null;
    }

    loadData(data) {
        this.data = data;
        this.emitChange();
    }

    getState() {
        return {
            data: this.data
        };
    }


    // For sending state to the client
    dehydrate() {
        return this.getState();
    }

    // For rehydrating server state
    rehydrate(state) {
        this.data = state.data;
    }

}


DemoStore.storeName = 'DemoStore';
DemoStore.handlers = {
    "LOAD_DATA": "loadData",
};

export default DemoStore;