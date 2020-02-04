import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { SupporTicketsComponent } from './support-tickets.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketDetailResolverService } from './services/ticket-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SupporTicketsComponent,
    children: [
      { path: 'add', component: AddTicketComponent },
      { path: ':id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolverService } },
      { path: '', component: TicketsComponent },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportTicketsRoutingModule {}