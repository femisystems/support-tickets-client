import { Pipe, PipeTransform } from '@angular/core';
import { ISupportTicket } from '../interfaces/ticket';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilter implements PipeTransform {
  transform(list: ISupportTicket[], searchStr: string) {
    const str = searchStr.trim();

    if (str.length) {
      return list.filter(ticket => {
        const isInDescription = ticket.description.toLowerCase().indexOf(str) > -1;
        const isInTitle = ticket.title.toLowerCase().indexOf(str) > -1;

        return isInTitle || isInDescription;
      });
    }

    return list;
  }
}
