import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { Observable, of, EMPTY } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TicketDetailResolverService implements Resolve<ISupportTicket>{

  constructor(
    private router: Router,
    private ticketService: TicketService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISupportTicket> | any {
    this.router
    let id = route.paramMap.get('id');
    return this.ticketService.getById(id)
      .pipe(
        take(1),
        map(supportTicket => {
          if (supportTicket) {
            return of(supportTicket)
          } else {
            this.router.navigate(['/support-tickets']);
            return EMPTY;
          }
        })
      )
  }
}
