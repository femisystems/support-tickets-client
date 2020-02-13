import { NgModule } from "@angular/core";
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { CommonModule } from '@angular/common';
import { TicketFormComponent } from 'src/app/components/ticket-form/ticket-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SearchFilter } from 'src/app/pipes/search-filter.pipe';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    AddTicketComponent,
    TicketDetailComponent,
    TicketFormComponent,
    SearchFilter
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  exports: [TicketsRoutingModule]
})
export class TicketsModule {}