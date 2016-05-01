import { Component } from "angular2/core";
import { Router } from "angular2/router";
import {Observable} from "rxjs/Observable";
import {Store} from '@ngrx/store';
import C from '../../constants';

interface AppState {
  counter: number;
}

@Component({
  selector: "dashboard",
  template: require("./dashboard.component.html")
})

export class DashboardComponent {
  counter: Observable<number>;
  constructor(public store: Store<AppState>) {
    this.counter = store.select('counter');
  }
  increment() {
    this.store.dispatch({ type: C.INCREMENT });
  }
  decrement() {
    this.store.dispatch({ type: C.DECREMENT });
  }
  reset() {
    this.store.dispatch({ type: C.RESET });
  }
}
