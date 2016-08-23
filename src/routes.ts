import { provideRouter, RouterConfig } from "@angular/router";
import {
  DashboardComponent,
  LoginComponent,
  PlaceMapComponent,
  TagPageComponent,
  PlacePageComponent,
} from "./components";
import { RouteGuard } from "./services";

export const appRoutes: RouterConfig = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    component: DashboardComponent,
    path: "dashboard",
  },
  {
    canActivate: [RouteGuard],
    component: TagPageComponent,
    path: "tags",
  },
  {
    canActivate: [RouteGuard],
    component: PlacePageComponent,
    path: "places",
  },
  {
    component: LoginComponent,
    path: "login",
  },
  {
    canActivate: [RouteGuard],
    component: PlaceMapComponent,
    path: "map",
  },
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
