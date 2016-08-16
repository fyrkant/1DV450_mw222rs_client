import { provideRouter, RouterConfig } from "@angular/router";
import {
  DashboardComponent,
  LoginComponent,
  PlaceMapComponent
} from "./components";
import { RouteGuard } from "./services"

export const appRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: PlaceMapComponent, canActivate: [RouteGuard] }
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
