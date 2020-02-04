import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { ISupportTicket } from 'src/app/interfaces/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { catchError, tap, throttle, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  title = 'Support Tickets';
  supportTickets: ISupportTicket[] = [];
  ticketLoadError = '';
  baseRoute = '/support-tickets';
  deletingTicket = '';
  searchResult: ISupportTicket[] = [];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSupportTickets();
  }

  getSupportTickets() {
    this.ticketService.all()
      .pipe(
        catchError(error => {
          this.ticketLoadError = error;
          return EMPTY;
        })
      ).subscribe(supportTickets => this.supportTickets = supportTickets);
  }

  search(input: string) {
    of(input)
      .pipe(
        map(str => str.toLowerCase()),
        throttle(str => interval(1000))
      ).subscribe(str => {
        if (str.length) {
          const filtered = this.supportTickets.filter(ticket => {
            const isInDescription = ticket.description.toLowerCase().indexOf(str) > -1;
            const isInTitle = ticket.title.toLowerCase().indexOf(str) > -1;

            return isInDescription || isInTitle;
          });
          this.searchResult = [...filtered];
        } else {
          this.searchResult = [];
        }
        console.log(this.searchResult);
      });
  }

  goto(ticketId: string, isEditMode: boolean = false) {
    let url = '/support-tickets';

    if (isEditMode) {
      url = `${url}/${ticketId}`;
      this.router.navigate([url, { queryParams: { mode: 'edit' }}]);
    } else {
      this.router.navigate([url, ticketId]);
    }
  }

  deleteTicket(event, ticketId: string) {
    this.deletingTicket = ticketId;
    this.ticketService.delete(ticketId)
      .subscribe(
        response => {
          this.deletingTicket = '';
          this.toastr.success('Ticket successfully deleted', 'Success');
          this.getSupportTickets();
        }
      )
  }

  dismiss(event) { return }
}
