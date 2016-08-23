import { Component } from "@angular/core";
import { FlashService } from "../../services/";

@Component({
  selector: "pa-flash-message",
  styles: [`.flash-message {
              position: absolute;
              width: 250px;
              padding: 10px;
              top: 80px;
              right: 20px;
              background-color: #fff;
              z-index: 200;
              box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
              border-radius: 2px;
            }
            .error-message {
              background-color: red;
              color: white;
            }`],
  template: `<div
    *ngIf="flash.hasMessage()"
    class="flash-message"
    [class.error-message]="flash.isErrorMessage()"
    (click)="flash.dismissMessage()"
    >
      {{flash.getMessage()}}
    </div>`,
})
export class FlashMessageComponent {
  constructor(private flash: FlashService) {}
}
