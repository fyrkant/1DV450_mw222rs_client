import { Injectable } from "@angular/core";

@Injectable()
export class FlashService {
  message: String = "";
  isError: Boolean = false;

  constructor() {
  }

  public isErrorMessage() {
    return this.isError;
  }

  public hasMessage() {
    return this.message !== "";
  }
  public setMessage(message) {
    this.message = message;
  }
  public setError(message) {
    this.message = message;
    this.isError = true;
  }
  public dismissMessage() {
    this.message = "";
    this.isError = false;
  }
  public getMessage() {
    return this.message;
  }

}
