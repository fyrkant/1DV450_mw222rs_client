import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe"
})
export class SearchPipe implements PipeTransform {
  transform(events: any, term): any {
    if (events) {
      console.log(term);
      console.log(events);

      return events.length !== 0 && events.filter(event => event.attributes.name.startsWith(term));
    }
  }
}
