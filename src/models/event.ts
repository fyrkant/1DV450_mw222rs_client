import {Place} from "./place";

export class Event {
  public attributes: Object = class {
    public id: number;
    public date: Date;
    public name: string;
    public description: string;
    public place: Place;
  };
}
