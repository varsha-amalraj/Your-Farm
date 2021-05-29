import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { SendMessageComponent } from './pages/components/send-message/send-message.component';
import { UserDetailComponent } from './pages/components/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user-detail',
    component: UserDetailComponent,
  },
  {
    path: 'send-message',
    component: SendMessageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
