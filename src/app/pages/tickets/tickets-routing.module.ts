import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketDetailResolverService } from '../../services/ticket-detail-resolver.service';

const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'add', component: AddTicketComponent },
  { path: ':id', component: TicketDetailComponent, resolve: { ticket: TicketDetailResolverService } },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}