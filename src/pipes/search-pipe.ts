import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchPipe"
})
export class SearchPipe implements PipeTransform {
  transform(events: any): any {
    console.log(events);

    return events && events;
  }
}
