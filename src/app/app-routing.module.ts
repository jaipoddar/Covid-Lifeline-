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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'joingroup',
    pathMatch: 'full'
  },
  { path: 'requests/:id', component: RequestsComponent},
  { path: 'joingroup', component: JoinGroupPage},
  { path: 'addrequest', component: AddRequestPage},
  {
    path: 'tabs', component: TabsPage, children:
    [
       { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
       { path: 'dashboard', component: DashboardPage},
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
