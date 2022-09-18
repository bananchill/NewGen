import App from "./parts/App";


export default class {
  name = 'top-level-app-view';

  configure(_app) {
    _app.appView = App;

    _app.mountNode = "#app";
  }
}
