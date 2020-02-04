import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TicketService } from './services/ticket.service';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidePanelComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    SweetAlert2Module.forRoot()
  ],
  providers: [TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
