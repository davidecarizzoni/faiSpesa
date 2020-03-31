import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';

// DICHIARAZIONE ROUTES DEI COMPONENTI
const appRoutes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'list', component: ListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class ListRoutingModule {}