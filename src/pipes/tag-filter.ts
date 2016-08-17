import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "tagFilter"
})
export class TagFilterPipe implements PipeTransform {
  public transform(events, tag): Array<any> {
    return tag && events
      ? events.filter(e => e.relationships.tags.data.map(t => t.id).includes(tag))
      : events;
  }
}
