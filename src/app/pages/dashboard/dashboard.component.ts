import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ticketStats$: Observable<any>;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.ticketStats$ = of(this.ticketService.stats);
  }
}
