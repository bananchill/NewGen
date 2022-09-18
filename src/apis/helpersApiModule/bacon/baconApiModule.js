/* eslint max-classes-per-file: ["error", 2] */

import Adapter from "@/apis/toolkit/Adapter";

class BaconApiImpl {
    name = 'baconText';


    #p_Adapter = null;

    #p_Log = null;


    constructor(_log) {
        this.#p_Log = _log;
    }

    set log(_log) {
        this.#p_Log = _log;
    }

    init() {
        const log = this.#p_Log;
        log.i(`using baconApiModule`)
        this.#p_Adapter = new Adapter(log)
    }

    async getInfoAsync(type) {
        const defaultQuery = {
            type: 'meat-and-filler',
            sentence: 40,
            format: 'json'
        }
        type = Object.assign(defaultQuery, type)
        console.log(type)
        const text = await this.#p_Adapter.requestJsonAsync({
            method: 'GET',
            body: type,
            operationDescription: `get text`,
        });
        return text
    }


}

export default class BaconApiModule {
    name = 'post-api';

    #pLog = null;

    set log(_log) {
        this.#pLog = _log;
    }

    install(_app) {
        _app.interfaces.register('baconApi', () => {
            const api = new BaconApiImpl(this.#pLog, _app.adapter);
            api.init();
            return api;
        });

    }
}
