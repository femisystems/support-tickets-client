import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { Observable, of } from 'rxjs';
import { take, map, catchError, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as ticketReducer from '../store/ticket.reducer';
import * as ticketActions from '../store/ticket.actions';

@Injectable({
  providedIn: 'root'
})
export class TicketDetailResolverService implements Resolve<ISupportTicket>{

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private store: Store<{tickets: ticketReducer.ITicket, loader: any}>
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | ISupportTicket> | any {
    const id = route.paramMap.get('id');
    return this.ticketService.getById(id)
      .pipe(
        map(supportTicket => {
          console.log(of(supportTicket));
          return of(supportTicket);
        }),
        catchError(error => this.router.navigate(['/tickets']))
      )
  }
}
