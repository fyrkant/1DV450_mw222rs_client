import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "search-box",
  template: `
  <div>
    <input #input type="text" (input)="change.emit(input.value)" type="text" />
  </div>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.change.emit("");
  }

}
