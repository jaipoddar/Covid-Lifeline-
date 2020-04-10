import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { DashboardPage } from './dashboard/dashboard.page';
import {AddRequestPage} from './add-request/add-request.page';
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { RequestsComponent } from './dashboard/requests/requests.component';
>>>>>>> 96ce36ae34d234f246771c90a3f44e1b771a80e1

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  { path: 'requests/:id', component: RequestsComponent},
  {
    path: 'tabs', component: TabsPage, children:
    [
       { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
<<<<<<< HEAD
       { path: 'dashboard', component: DashboardPage},
       { path: 'addrequest', component: AddRequestPage},
=======
       { path: 'dashboard', component: DashboardPage},       
>>>>>>> 96ce36ae34d234f246771c90a3f44e1b771a80e1
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
