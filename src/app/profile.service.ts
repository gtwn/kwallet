import { Injectable } from '@angular/core';
import { Profile } from './balance/profile.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Transaction } from './transaction.model';

const BACKEND_URL = environment.apiUrl + '/user/';
@Injectable({ providedIn: 'root' })
// tslint:disable-next-line: class-name
export class profileService {
  private profile: Profile[] = [];
  private transac: Transaction[] = [];
  private postsUpdated = new Subject<Transaction[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProfile(account: string) {
    return this.http.get<{
      account: string,
      username: string ,
      balance: string,
      firstname: string,
      lastname: string
      email: string}>(BACKEND_URL + account);
  }

  getTransaction(accountts: string) {
    return this.http.get<{ transac: any }>(BACKEND_URL + '/transac/' + accountts)
    .pipe(
      map(transData => {
        return { transac: transData.transac.map(transaction => {
          return {
            typeT: transaction.typeT,
            Account: transaction.account,
            amount: transaction.amount,
            accountts: transaction.accountts,
            datetime: transaction.create
          };
        })
      };
      })
    )
    .subscribe(transformedPosts => {
      this.transac = transformedPosts.transac;
      this.postsUpdated.next([...this.transac]);
    });
  }

  // getTransaction(accountts: string) {
  //   return this.http.get<{ transac: any }>(BACKEND_URL + accountts);
  // }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // getPosts(accountts: string) {
  //   this.http
  //     .get<{ transaction: any }>(BACKEND_URL + accountts)
  //     .pipe(
  //       map(postData => {
  //         return postData.transaction.map(trans => {
  //           return {
  //             typeT: trans.typeT,
  //             Account: trans.account,
  //             amount: trans.amount,
  //             accountts: trans.accountts,
  //             id: trans.id,
  //             create: trans.create
  //           };
  //         });
  //       })
  //     )
  //     .subscribe(transformedPosts => {
  //       this.transaction = transformedPosts;
  //       this.postsUpdated.next([...this.transaction]);
  //     });
  // }

  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }
}
