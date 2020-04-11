import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { DashboardPage } from './dashboard/dashboard.page';
import {AddRequestPage} from './add-request/add-request.page';
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestsComponent } from './dashboard/requests/requests.component';
import { JoinGroupPage } from './joingroup/joingroup.page';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/dashboard',
    pathMatch: 'full'
  },
  { path: 'requests/:id', component: RequestsComponent},
  { path: 'joingroup', component: JoinGroupPage},
  { path: 'addrequest', component: AddRequestPage},
  { path: 'registration', component: RegistrationComponent},
  {
    path: 'tabs', component: TabsPage, children:
    [
       { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService]},
       { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuardService]},
       { path: 'about', component: AboutPage},
       { path: 'contact', component: ContactPage}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export class AppRoutingModule {}
