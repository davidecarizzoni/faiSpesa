import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogsignComponent } from './components/logsign/logsign.component';
import { LoginRouteGuardService } from './services/routeguard/login-route-guard.service';
import { ContattiComponent } from './components/contatti/contatti.component';

// DICHIARAZIONE ROUTES DEI COMPONENTI
const appRoutes: Routes = [
    { path:'home', component: HomeComponent},
    { path:'login',component: LogsignComponent},
    { path:'list', component: ListComponent, canActivate: [LoginRouteGuardService]},
    { path:'contatti',component: ContattiComponent},
    { path:'', redirectTo: '/home', pathMatch:'full'},
    { path:'**',component: PageNotFoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class ListRoutingModule {}