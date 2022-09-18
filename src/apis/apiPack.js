
import BaconApiModule from "@/apis/helpersApiModule/bacon/baconApiModule";

export default class ApiPack{
    name = 'api-pack'

    install(_app){
        _app.use(new BaconApiModule())
    }
}
