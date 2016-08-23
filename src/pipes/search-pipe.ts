import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "paSearchPipe",
})
export class SearchPipe implements PipeTransform {
  public transform(events: any, term): any {
    if (events) {
      return events.length !== 0 && events.filter(
        ({attributes}) => attributes.name.toLowerCase().includes(term.toLowerCase()));
    }
  }
}
