import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets', loadChildren: () => import('./pages/tickets/tickets.module').then(mod => mod.TicketsModule) },
  { path: '', component: SidePanelComponent, outlet: 'sidepanel' },
  { path: '', component: HeaderComponent, outlet: 'header' }, 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
