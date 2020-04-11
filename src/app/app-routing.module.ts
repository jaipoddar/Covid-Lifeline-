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
import {CreategroupPage} from './creategroup/creategroup.page';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'creategroup',
    pathMatch: 'full'
  },
  { path: 'requests/:id', component: RequestsComponent},
  { path: 'joingroup', component: JoinGroupPage},
  { path: 'creategroup', component: CreategroupPage},
  { path: 'addrequest', component: AddRequestPage},
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardPage, canActivate: [AuthGuardService]},
  { path: 'about', component: AboutPage},
  { path: 'contact', component: ContactPage},
  { path: 'tabs', component: ContactPage},
  { path: '**', component: DashboardPage}
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
