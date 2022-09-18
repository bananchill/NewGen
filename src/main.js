import * as Vue from 'vue';


import Application from "./infrastructure/app/application";

import ApiPack from "@/apis/apiPack";


import AppConfigurationProviderModule from "@/modules/appConfigurationProvider/appConfigurationProviderModule";
import appViewModule from "@/modules/appView/appViewModule";

import "./styles/total.scss"



// *********************************************************
// Setup version
// *********************************************************
window.Vue = Vue;

// ************************
// Creating application
// ************************

const app = new Application();



const appLogUngroup = app.log.groupCollapsed('configure');


app.use(new AppConfigurationProviderModule());


// ************************
// Installing modules
// ************************\


app.use(new appViewModule())

app.use(new ApiPack());

appLogUngroup();


setTimeout(async () => await app.runAsync(), 0);
