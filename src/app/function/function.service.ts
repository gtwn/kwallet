import { Injectable } from '@angular/core';
import { Transfer } from './transfer.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Topup } from './topup.model';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

const BACKEND_URL = environment.apiUrl + '/func/';

@Injectable({ providedIn: 'root'})
export class FunctionService {
  private oldAcc = this.authService.getAcc();
  private oldBalance = this.authService.getBalance();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}


  transFer( typeT: string, Account: string, amount: string) {
    const oldBalance = this.authService.getBalance();
    const oldAcc = this.authService.getAcc();
    const transFer: Transfer = {
      typeT: typeT,
      Account: Account,
      amount: amount,
      accountts: oldAcc};
    // tslint:disable-next-line: radix
    if ( parseInt(oldBalance) < parseInt(transFer.amount) || oldAcc === Account) {
      return;
    } else {
      const newBalance = parseFloat(oldBalance) - parseFloat(transFer.amount);
      console.log(newBalance);

      this.http
        .post(BACKEND_URL + '/transfer' , transFer).subscribe((err) => {
          console.log('success');
          localStorage.setItem('balance', newBalance.toString());
          this.router.navigate(['/balance']);
          // location.replace('http://localhost:4200/balance');
        },
        error => {
          console.log(error);
        });
      }
  }

  topup(typeT: string, code: string) {
    const oldAcc = this.authService.getAcc();
    const topup: Topup = {
      typeT: typeT,
      code: code,
      Account: oldAcc
    };
    this.http.post<{balanced: any , message: string}>(BACKEND_URL + '/topup' , topup).subscribe( responseData => {
      localStorage.setItem('balance', responseData.balanced.toString());
      console.log(localStorage.getItem('balance'));
      if (responseData.message === 'This code cant use') {
        location.reload();
      }
      this.router.navigate(['/balance']);
    });
  }
}
