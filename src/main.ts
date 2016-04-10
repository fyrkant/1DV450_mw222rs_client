import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { RouteConfig
       , Location
       , LocationStrategy
       , HashLocationStrategy
       , ROUTER_PROVIDERS } from "angular2/router";
import { AppComponent } from "./app.component";

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
])
  .then(success => console.log("Bootstrap success!"))
  .catch(error => console.log(error));
