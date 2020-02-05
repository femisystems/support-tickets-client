import { Pipe, PipeTransform } from '@angular/core';
import { ISupportTicket } from '../interfaces/ticket';

@Pipe({
  name: 'statsGenerator'
})
export class StatsGeneratorPipe implements PipeTransform {

  transform(supportTickets: ISupportTicket[], ...args: any[]): any {
    const stats = [0, 0, 0];

    supportTickets.forEach(ticket => {
      if (ticket.status === 0) stats[0] += 1;
      if (ticket.status === 1) stats[1] += 1;
      if (ticket.status === 2) stats[2] += 1;
    });
    
    return [
      { value: stats[0], label: 'open tickets', type: 0 },
      { value: stats[1], label: 'in progress', type: 1 },
      { value: stats[2], label: 'done', type: 2 }
    ]
  }
}
