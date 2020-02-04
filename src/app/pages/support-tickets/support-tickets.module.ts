import { NgModule } from "@angular/core";
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { SupportTicketsRoutingModule } from './support-tickets-routing.module';
import { SupporTicketsComponent } from './support-tickets.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { CommonModule } from '@angular/common';
import { TicketFormComponent } from 'src/app/components/ticket-form/ticket-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
@NgModule({
  declarations: [
    SupporTicketsComponent,
    TicketsComponent,
    TicketDetailComponent,
    AddTicketComponent,
    TicketsComponent,
    TicketDetailComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    SupportTicketsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  exports: [SupportTicketsRoutingModule]
})
export class SupportTicketsModule {}