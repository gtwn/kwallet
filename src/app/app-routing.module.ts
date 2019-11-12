import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { transferComponent } from './function/transfer/transfer.component';
import { paymentComponent } from './function/payment/payment.component';
import { topupComponent } from './function/topup/topup.component';
import { balanceComponent } from './balance/balance.component';
import { profileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'post', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' , canActivate: [!AuthGuard]},
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'transfer', component: transferComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: paymentComponent, canActivate: [AuthGuard]},
  { path: 'topup', component: topupComponent, canActivate: [AuthGuard]},
  { path: 'balance', component: balanceComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: profileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
