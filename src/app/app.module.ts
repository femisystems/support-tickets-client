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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromTicketReducer from './store/ticket.reducer';
import { environment } from 'src/environments/environment';
import { TicketEffects } from './store/ticket.effects';
import { StatsGeneratorPipe } from './pipes/stats-generator.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidePanelComponent,
    PageNotFoundComponent,
    StatsGeneratorPipe,
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
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot({
      tickets: fromTicketReducer.ticketReducer,
      errors: fromTicketReducer.errorReducer,
      loader: fromTicketReducer.loaderReducer,
    }),
    EffectsModule.forRoot([TicketEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [TicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
