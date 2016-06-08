import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "tagFilter"
})
export class TagFilterPipe implements PipeTransform {
  transform(events, tag): Array<any> {
    console.log(tag);
    return tag && events ? events.filter(e => e.relationships.tags.data.map(t => t.id).indexOf(tag) !== -1) : events;
  }
}
